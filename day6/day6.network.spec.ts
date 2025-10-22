import { test, expect } from '@playwright/test';

const API_URL = 'https://jsonplaceholder.typicode.com/todos/1';

test.describe('Day 6 - Network & API Interception ', () => {

  test('1) Intercept a network call and log request/response', async ({ page }) => {
   
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));

    
    page.on('request', req => {
      console.log('[request]', req.method(), req.url());
    });

    
    page.on('response', async res => {
      if (res.url().includes('jsonplaceholder.typicode.com')) {
        console.log('[response]', res.url(), 'status=', res.status());
        const body = await res.text();
        console.log('[response body]', body);
      }
    });

    
    await page.route('**/todos/**', async (route) => {
      const request = route.request();
      console.log('[route intercepted]', request.method(), request.url());
      await route.continue(); 
    }); 

   
    await page.setContent(`
      <html>
        <body>
          <div id="result">loading...</div>
          <script>
            (async () => {
              try {
                const r = await fetch('${API_URL}');
                const json = await r.json();
                document.getElementById('result').textContent = JSON.stringify(json);
                console.log('fetch done');
              } catch (e) {
                console.error('fetch error', e);
                document.getElementById('result').textContent = 'ERROR';
              }
            })();
          </script>
        </body>
      </html>
    `);

    
    const result = page.locator('#result');
    await expect(result).not.toHaveText('loading...', { timeout: 5000 });

    
    const text = (await result.textContent())?.trim() ?? '';
    expect(text).not.toBe('');
    const parsed = JSON.parse(text);
    expect(parsed).toHaveProperty('id', 1);
  });

  test('2) Mock an API response for testing', async ({ page }) => {
    const mockedPayload = {
      userId: 99,
      id: 1,
      title: 'mocked task from Day6 test',
      completed: true
    };

    
    await page.route('**/todos/1**', async (route) => {
      await route.fulfill({
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(mockedPayload),
      });
    });

    
    await page.setContent(`
      <html>
        <body>
          <pre id="json">waiting</pre>
          <script>
            (async () => {
              try {
                const r = await fetch('${API_URL}');
                const j = await r.json();
                document.getElementById('json').textContent = JSON.stringify(j);
                console.log('mocked fetch complete');
              } catch (err) {
                console.error('fetch failed', err);
                document.getElementById('json').textContent = 'ERROR';
              }
            })();
          </script>
        </body>
      </html>
    `);

    const locator = page.locator('#json');
    await expect(locator).not.toHaveText('waiting', { timeout: 5000 });

    const text = await locator.textContent() ?? '';
    const parsed = JSON.parse(text);

    expect(parsed).toMatchObject({
      userId: 99,
      id: 1,
      title: 'mocked task from Day6 test',
      completed: true
    });
  });

  test('3) Send a GET request using Playwright request API and assert JSON response', async ({ request }) => {
    const response = await request.get(API_URL);
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    const json = await response.json();

    expect(json).toHaveProperty('id', 1);
    expect(typeof json.title).toBe('string');
    expect(json).toMatchObject({
      userId: expect.any(Number),
      id: 1,
      completed: expect.any(Boolean),
    });
  });

});
