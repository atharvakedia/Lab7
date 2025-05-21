Atharva Kedia

A17478027

### 1) Where would you fit your automated tests in your Recipe project development pipeline?

**Answer:**  
**Within a GitHub action that runs whenever code is pushed**

**Why:**  
This ensures consistent, automated testing on every code change. It catches bugs early, supports collaboration through visible test results in pull requests, and removes the risk of forgetting to run tests manually. It’s more reliable than manual or post-development testing.

### 2) Would you use an end-to-end test to check if a function is returning the correct output?

**No**  
End-to-end tests are used to simulate user interactions and verify full application workflows. To test individual function outputs, unit tests are more appropriate.

---

### 3) What is the difference between navigation and snapshot mode?

**Navigation mode** analyzes a page immediately after it loads and measures overall performance, accessibility, SEO, etc.  
**Snapshot mode** captures the page in its current state without analyzing load time or JS performance—useful for detecting layout and accessibility issues.

---

### 4) Name three things we could do to improve the CSE 110 shop site based on the Lighthouse results.

1. **Optimize image sizes** to reduce load time and improve performance.
2. **Add alt text to all images** to enhance accessibility.
3. **Minimize unused JavaScript and CSS** to boost speed and reduce resource usage.