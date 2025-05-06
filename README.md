# Loan Calculator App

A modern, feature-rich loan calculator application built with React and Material UI that helps users calculate EMIs, view amortization schedules, and perform currency conversions in real-time.

![Loan Calculator App](https://images.pexels.com/photos/4386372/pexels-photo-4386372.jpeg?auto=compress&cs=tinysrgb&w=800)

# Live_App Link : ![Loan Calculator App](https://loan-calculator-git-main-nithishs-projects-708e4965.vercel.app/)

## Features

- 🧮 **EMI Calculator**: Calculate loan EMIs with customizable principal, interest rate, and tenure
- 📊 **Amortization Schedule**: View detailed monthly breakdown of loan repayment
- 💱 **Currency Conversion**: Convert EMIs to different currencies using real-time exchange rates
- 🌐 **Exchange Rate Table**: Browse and search through multiple currency exchange rates
- 🌓 **Dark/Light Mode**: Toggle between dark and light themes
- 📱 **Responsive Design**: Fully responsive UI with mobile navigation support
- ⚠️ **Error Handling**: Graceful error handling with user-friendly messages

## Tech Stack

- React 18
- Material UI
- React Router
- Axios
- Exchange Rate API
- TypeScript
- Vite
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Exchange Rate API key (get it from [Exchange Rate API](https://www.exchangerate-api.com/))

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/loan-calculator-app.git
cd loan-calculator-app
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Exchange Rate API key
```env
VITE_EXCHANGE_RATE_API_KEY=your_api_key_here
```

4. Start the development server
```bash
npm run dev
```

## EMI Calculation Formula

The EMI (Equated Monthly Installment) is calculated using the standard formula:

```
EMI = [P x R x (1+R)^N] / [(1+R)^N - 1]

Where:
P = Principal loan amount
R = Monthly interest rate (annual rate / 12 / 100)
N = Loan duration in months
```

## Project Structure

```
src/
├── components/        # Reusable UI components
├── contexts/         # React Context providers
├── hooks/           # Custom React hooks
├── pages/           # Page components
└── main.tsx         # Application entry point
```

## Key Components

- **LoanCalculator**: Main calculator component with input fields and summary
- **AmortizationSchedule**: Displays monthly loan payment breakdown
- **ExchangeRatesTable**: Shows current exchange rates with search functionality
- **CurrencySelector**: Dropdown for selecting different currencies



## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Material UI](https://mui.com/) for the component library
- [Exchange Rate API](https://www.exchangerate-api.com/) for currency conversion rates
- [Lucide React](https://lucide.dev/) for icons
