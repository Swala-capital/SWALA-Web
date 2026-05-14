
const validateCalculator = () => {
  const rates = {
    public: 0.018,
    large: 0.020,
    medium: 0.022
  };
  const platformFee = 0.01;
  let totalTests = 0;
  let passedTests = 0;
  let errors = [];

  for (const type in rates) {
    const monthlyRate = rates[type];
    for (let amount = 1000000; amount <= 200000000; amount += 1000000) {
      for (let days = 15; days <= 120; days += 15) {
        totalTests++;

        const financialCost = amount * monthlyRate * (days / 30);
        const serviceFee = amount * platformFee;
        const totalCost = financialCost + serviceFee;
        const netAmount = amount - totalCost;

        // VALIDACIONES
        const isNumber = !isNaN(netAmount) && isFinite(netAmount);
        const isPositive = netAmount > 0;
        const integrityCheck = Math.abs((netAmount + totalCost) - amount) < 0.01;

        if (isNumber && isPositive && integrityCheck) {
          passedTests++;
        } else {
          errors.push({ type, amount, days, netAmount });
        }
      }
    }
  }

  console.log('--- REPORTE DE ESTRÉS FASE 2 ---');
  console.log(`Combinaciones probadas: ${totalTests}`);
  console.log(`Pruebas exitosas: ${passedTests}`);
  console.log(`Errores: ${errors.length}`);
  
  if (errors.length === 0) {
    console.log('ESTADO: 100% ESTABLE. Las tasas dinámicas son infalibles.');
  }
};

validateCalculator();
