import { useState, useEffect } from 'react';

export type EMIInputs = {
  principal: number;
  interestRate: number;
  loanTerm: number;
};

export type AmortizationRow = {
  month: number;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  endingBalance: number;
  totalInterest: number;
};

export const useEMICalculator = () => {
  const [inputs, setInputs] = useState<EMIInputs>({
    principal: 100000,
    interestRate: 5,
    loanTerm: 12,
  });
  
  const [emi, setEmi] = useState<number>(0);
  const [totalPayment, setTotalPayment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);

  const updateInputs = (newInputs: Partial<EMIInputs>) => {
    setInputs(prev => ({ ...prev, ...newInputs }));
  };

  const calculateEMI = () => {
    const { principal, interestRate, loanTerm } = inputs;
    
    // Convert annual interest rate to monthly and decimal
    const monthlyRate = interestRate / 12 / 100;
    
    // Calculate EMI using the formula: EMI = [P x R x (1+R)^N] / [(1+R)^N-1]
    const emiValue = principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm) / 
                    (Math.pow(1 + monthlyRate, loanTerm) - 1);
                    
    return isNaN(emiValue) || !isFinite(emiValue) ? 0 : emiValue;
  };

  const calculateAmortizationSchedule = () => {
    const { principal, loanTerm } = inputs;
    const emiValue = calculateEMI();
    const monthlyRate = inputs.interestRate / 12 / 100;
    
    let balance = principal;
    let totalInterestPaid = 0;
    const schedule: AmortizationRow[] = [];
    
    for (let month = 1; month <= loanTerm; month++) {
      // Calculate interest for this month
      const interestPayment = balance * monthlyRate;
      
      // Calculate principal payment for this month
      const principalPayment = emiValue - interestPayment;
      
      // Update running total of interest paid
      totalInterestPaid += interestPayment;
      
      // Add row to schedule
      schedule.push({
        month,
        beginningBalance: balance,
        payment: emiValue,
        principal: principalPayment,
        interest: interestPayment,
        endingBalance: balance - principalPayment,
        totalInterest: totalInterestPaid
      });
      
      // Update remaining balance
      balance -= principalPayment;
    }
    
    return schedule;
  };

  useEffect(() => {
    const emiValue = calculateEMI();
    setEmi(emiValue);
    
    const totalPaymentValue = emiValue * inputs.loanTerm;
    setTotalPayment(totalPaymentValue);
    
    const totalInterestValue = totalPaymentValue - inputs.principal;
    setTotalInterest(totalInterestValue);
    
    const schedule = calculateAmortizationSchedule();
    setAmortizationSchedule(schedule);
  }, [inputs]);

  return {
    inputs,
    updateInputs,
    emi,
    totalPayment,
    totalInterest,
    amortizationSchedule,
  };
};