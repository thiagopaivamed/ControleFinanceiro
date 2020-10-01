using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.ViewModels
{
    public class DadosCardsDashboardViewModel
    {
        public int QtdCartoes { get; set; }

        public double GanhoTotal { get; set; }

        public double DespesaTotal { get; set; }

        public double Saldo { get; set; }
    }
}
