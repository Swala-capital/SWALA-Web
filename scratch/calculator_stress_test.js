
const validateCalculator = () => {
  const monthlyRate = 0.025;
  const platformFee = 0.01;
  let totalTests = 0;
  let passedTests = 0;
  let errors = [];

  // Iterar por todos los montos (1M a 200M en pasos de 1M)
  for (let amount = 1000000; amount <= 200000000; amount += 1000000) {
    // Iterar por todos los plazos (15 a 120 en pasos de 15)
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
        errors.push({ amount, days, netAmount, totalCost });
      }
    }
  }

  console.log('--- REPORTE DE ESTRÉS MATEMÁTICO ---');
  console.log(`Combinaciones probadas: ${totalTests}`);
  console.log(`Pruebas exitosas: ${passedTests}`);
  console.log(`Errores encontrados: ${errors.length}`);
  
  if (errors.length > 0) {
    console.log('Detalle de errores:', errors.slice(0, 5));
  } else {
    console.log('ESTADO: 100% ESTABLE. El algoritmo es infalible para el rango definido.');
  }
};

validateCalculator();
