k// Bank Account Management System


// Storage for all accounts

let accounts = [];

// BankAccount Class

class BankAccount {
  constructor(accountNumber, initialBalance) {
    if (!accountNumber.startsWith("IN") || accountNumber.length !== 12) {
      throw new Error("❌ Account number must start with 'IN' and be 12 characters long.");
    }
    if (initialBalance < 1000) {
      throw new Error("❌ Initial balance must be at least ₹1000.");
    }

    this.accountNumber = accountNumber;
    this.balance = initialBalance;
  }

  // Deposit money
  deposit(amount) {
    if (amount <= 0) {
      console.log("❌ Deposit amount must be greater than 0.");
      return;
    }
    this.balance += amount;
    console.log(`✅ ₹${amount} deposited. New balance: ₹${this.balance}`);
  }

  // Withdraw money
  withdraw(amount) {
    if (amount <= 0) {
      console.log("❌ Withdrawal amount must be greater than 0.");
      return;
    }
    if (this.balance - amount < 1000) {
      console.log("❌ Cannot withdraw. Minimum balance of ₹1000 must be maintained.");
      return;
    }
    this.balance -= amount;
    console.log(`✅ ₹${amount} withdrawn. New balance: ₹${this.balance}`);
  }

  // Transfer money
  transfer(amount, targetAccountNumber) {
    let targetAccount = accounts.find(acc => acc.accountNumber === targetAccountNumber);

    if (!targetAccount) {
      console.log("❌ Target account not found.");
      return;
    }
    if (amount <= 0) {
      console.log("❌ Transfer amount must be greater than 0.");
      return;
    }
    if (this.balance - amount < 1000) {
      console.log("❌ Transfer failed. Insufficient balance after maintaining ₹1000 minimum.");
      return;
    }

    this.balance -= amount;
    targetAccount.balance += amount;

    console.log(`✅ ₹${amount} transferred to ${targetAccountNumber}. Your new balance: ₹${this.balance}`);
  }

  // Display account details
  displayDetails() {
    console.log(`📌 Account: ${this.accountNumber} | Balance: ₹${this.balance}`);
  }
}


// Function to create new accounts

function createAccount(accountNumber, initialAmount) {
  try {
    let newAccount = new BankAccount(accountNumber, initialAmount);
    accounts.push(newAccount);
    console.log(`🎉 Account created successfully! Account Number: ${accountNumber}, Balance: ₹${initialAmount}`);
  } catch (error) {
    console.log(error.message);
  }
}

// Function to display all accounts

function displayAllAccounts() {
  console.log("===== All Bank Accounts =====");
  if (accounts.length === 0) {
    console.log("⚠️ No accounts found.");
  } else {
    accounts.forEach(acc => acc.displayDetails());
  }
  console.log("=============================");
}

// Example Usage

// Creating accounts
createAccount("IN1234567890", 5000);
createAccount("IN0987654321", 3000);

// Depositing money
accounts[0].deposit(2000);

// Withdrawing money
accounts[1].withdraw(500);

// Transferring money
accounts[0].transfer(1000, "IN0987654321");

// Display all accounts
displayAllAccounts();
