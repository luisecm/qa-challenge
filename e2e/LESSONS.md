# Lessons Learned

Working on this automated test suite for a decentralized application (dApp) was both exciting and challenging. Along the way, I encountered several hurdles, each teaching me something valuable. Here’s a breakdown of the biggest challenges I faced and how I tackled them.

## 1. Setting Up a New MetaMask Wallet

Getting started with a fresh MetaMask wallet was more tedious than expected. While the setup itself was straightforward, making sure the wallet was properly configured for automation took extra effort. Managing seed phrases securely and ensuring the correct network settings were in place required careful attention.

## 2. Adding Sepolia Tokens and Funding the Wallet

To interact with Sepolia testnet tokens, I had to:

- Add the Sepolia network manually to MetaMask.
- Buy the minimum amount of Ethereum required to cover transaction fees.
- Manually add the ERC20 token contract address so the wallet would recognize my balance.

It was a small but necessary step that added time to the setup process.

## 3. Automating MetaMask Wallet Connection

This was probably one of the trickiest parts of the project. Automating MetaMask isn’t as simple as automating a regular web app. The biggest hurdles were:

- Finding a **reliable and maintained solution** that worked with Cucumber.
- **Synpress wasn’t compatible** with Cucumber v4, so I had to find an alternative.
- **Dappwright seemed like the best choice**, but since it’s not widely documented, I had to dig through Discord channels and GitHub issues to get it working properly.

## 4. Implementing Cucumber in a Clean and Scalable Way

Switching to Cucumber required some restructuring to keep the codebase maintainable. Some key decisions were:

- Using the **Page Object Model (POM)** to keep test logic separate from UI interactions.
- Identifying **reusable steps** to avoid writing the same code multiple times.
- Making sure shared steps were well-organized to keep everything clean and easy to update.

It took some trial and error, but in the end, I ended up with a structure that felt natural and easy to scale.

## 5. The Challenge of Finishing Everything in a Week

One of the biggest challenges was **time**. With so many moving parts—MetaMask setup, network configuration, finding the right automation tools, and structuring the test suite—it was hard to move as fast as I wanted. Researching solutions, debugging, and refining the setup all took time.

## **Final Thoughts**

This project was a great learning experience. It pushed me to problem-solve, research new tools, and refine my automation skills. Despite the challenges, I now have a much deeper understanding of Playwright, Cucumber, and how to automate dApp interactions effectively.

---

# Recommendations

## 1. QA Engineering is More Than Just Automation

QA isn’t just about writing automation scripts—it’s about **identifying early bugs, inconsistencies, and potential issues in definitions** before they reach production. A great challenge should also test **manual testing skills** by randomly introducing defects that the QA must report.

For example, while working on this challenge, I found that **the input field for token deposits allows sending more tokens than the placeholder text indicates.** If a QA engineer is too focused on automation and lets a bug like this slip into production, it could have severe consequences.

To ensure candidates have a strong **QA mindset**, challenges like this should evaluate how well they analyze requirements, find edge cases, and **think critically beyond automation**.

## 2. Clarify Expectations for Tools and Frameworks

It would be helpful if challenges clearly specify whether the tests should be written in **Playwright, Cypress, or another framework**. Since **Playwright offered the most stable way to connect MetaMask**, I chose to use it for this challenge. However, knowing in advance which tools are preferred would avoid unnecessary trial and error.

## 3. Other Aspects That Ensure High-Quality Web Applications

Beyond automation and manual testing, ensuring the **overall quality** of a web application involves:

- **Performance Testing:** Ensuring the application runs efficiently under different conditions.
- **Security Testing:** Identifying vulnerabilities, especially in blockchain applications.
- **Accessibility Testing:** Making sure the app is usable for people with disabilities.
- **Cross-Browser and Cross-Device Testing:** Verifying the application works seamlessly across different environments.
- **Usability Testing:** Evaluating whether the user experience is intuitive and easy to navigate.

By incorporating these aspects into a QA process, we can **deliver high-quality software that is reliable, secure, and user-friendly.**
