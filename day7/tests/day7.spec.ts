import { test, expect } from '@playwright/test';

test('take screenshots before and after form submission (local form)', async ({ page }) => {
  
  await page.setContent(`
    <html>
      <body>
        <h2>Simple Form</h2>
        <form id="myForm">
          <label>First name:</label>
          <input id="fname" type="text"><br><br>
          <label>Last name:</label>
          <input id="lname" type="text"><br><br>
          <button type="submit">Submit</button>
        </form>

        <p id="result"></p>

        <script>
          document.getElementById('myForm').addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('result').innerText =
              'Form submitted for ' + 
              document.getElementById('fname').value + ' ' + 
              document.getElementById('lname').value;
          });
        </script>
      </body>
    </html>
  `);

  console.log(' Simple local form loaded');

 
  await page.screenshot({ path: 'before.png' });

  
  await page.fill('#fname', 'Maha');
  await page.fill('#lname', 'Lakshmi');
 
  await page.click('button[type="submit"]');

 
  await expect(page.locator('#result')).toHaveText('Form submitted for Maha Lakshmi');

  
  await page.screenshot({ path: 'after.png' });

  console.log(' Screenshots captured successfully');
});
