# Day 2: Handling UI Components

## What I Learned

Today I learned how to work with different UI elements on a web page using Playwright.  
Things I learned:

- How to **click buttons and radio buttons**  
- How to **type in input fields**  
- How to **select options from dropdowns**  
- How to **check checkboxes**  
- How to **wait for elements** to appear  
- How to **verify things on the page** using assertions  
- How to **submit a form automatically**  

---

## What I Did

For practice, I wrote a test that:

- Opened a **Chromium browser** in visible mode  
- Went to the **demo form** page  
- Filled **first name, last name, email, and phone number**  
- Selected **Female** for gender  
- Checked **Sports and Music** hobbies  
- Selected **(State  and City )** from dropdowns  
- Clicked **Submit**  
- Waited for the **success modal** and checked the text  
- Closed the browser  

---

## How I Ran It

I ran the test like this:

```bash
npx playwright test day2/day2.spec.ts --headed
