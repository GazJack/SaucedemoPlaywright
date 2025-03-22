# 🛠️ SauceDemo Website Testing Playwright

This repository contains automated end-to-end tests for the [SauceDemo](https://www.saucedemo.com) web application using the [Playwright](https://playwright.dev) framework. These tests help verify the core functionalities of the SauceDemo site, including user authentication, product listing, shopping cart operations, and the checkout process.

## 📌 Table of Contents

- [✨ Features](#-features)
- [⚙️ Prerequisites](#-prerequisites)
- [📥 Installation](#-installation)
- [🚀 Running Tests](#-running-tests)
- [📂 Project Structure](#-project-structure)
- [🛠️ Configuration](#-configuration)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)
- [🙌 Acknowledgements](#-acknowledgements)

## ✨ Features

✅ **Automated Testing** – Comprehensive end-to-end tests for key user interactions.  
✅ **Cross-Browser Support** – Run tests on Chromium, Firefox, and WebKit.  
✅ **Detailed Reporting** – Built-in reporting with an option to generate HTML reports.  

## ⚙️ Prerequisites

Make sure you have the following installed:

- 📌 [Node.js](https://nodejs.org/) (v12 or later)
- 📌 [npm](https://www.npmjs.com/)

## 📥 Installation

Clone the repository and install dependencies:

```
git clone https://github.com/GazJack/SaucedemoPlaywright.git
cd SaucedemoPlaywright
npm install
```

## 🚀 Running Tests
Run all tests:
```
npx playwright test --ui
```

To generate and view an interactive report:
```
npx playwright show-report
```

## 📂 Project Structure
```
SaucedemoPlaywright/
├── tests/                 # Contains all Playwright test files
│   └── example.spec.js    # Sample test file (modify or add tests as needed)
├── playwright.config.js   # Playwright configuration file
├── package.json           # Project dependencies and scripts
└── README.md              # Project documentation
```

## 🛠️ Configuration
The main configuration is in playwright.config.js. Here, you can adjust:

🎯 Test directory

⏳ Timeout settings

🌍 Browser options

📊 Reporter configurations
Modify this file as needed to fit your project.

## 🤝 Contributing
Contributions are welcome! To contribute:

🍴 Fork the repository.

🌱 Create a new branch (git checkout -b feature/your-feature).

✏️ Make your changes.

📌 Commit (git commit -m 'Add new feature').

🚀 Push (git push origin feature/your-feature).

🔥 Open a pull request.

## 📜 License
This project is licensed under the MIT License.

## 🙌 Acknowledgements

💡 SauceDemo – For providing a testing playground.

💡 Playwright – For the powerful automation framework.

💡 Community & Contributors – For improving the testing ecosystem.
