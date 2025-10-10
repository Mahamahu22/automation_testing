# Day 1: Playwright Basics & Browser Operations

## What I Learned

On Day 1, I got introduced to **Playwright**, a tool that helps automate browsers for testing and checking websites.  

Here’s what I learned in simple terms:

- How to **install Playwright** and get the browsers ready (Chrome/Chromium, Firefox, Safari/WebKit)  
- The difference between **Headless** mode (browser runs in background) and **Headed** mode (browser opens so you can see it)  
- How to **launch a browser** and open a new tab or page  
- How to **go to a website** and check that the page loaded correctly  
- How to **get page information** like the title and URL  
- How to **find elements** on a page, like headings or links  
- How to **check things automatically** with assertions, like making sure the title is correct  
- How to **open multiple tabs** and work with them  
- How to **close pages and the browser** properly after finishing the test  

---

## What I Implemented

For my Day 1 practice, I did the following in Playwright:

- Opened a **Chromium browser** in visible mode so I could watch what was happening  
- Opened a **new tab** in the browser  
- Navigated to **example.com**  
- Printed the **page title and URL** in the terminal  
- Checked that the **title of the page was correct**  
- Found and printed the **heading text** on the page  
- Opened **another tab**, went to **playwright.dev**, and printed that page’s title  
- Closed all the tabs and the browser at the end

---

## How I Ran the Test

I ran my Day 1 test using the Playwright test runner with this command in the terminal:

```bash
npx playwright test day1/day1.spec.ts --headed
