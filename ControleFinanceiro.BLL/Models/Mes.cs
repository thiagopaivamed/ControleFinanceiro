using System.Collections.Generic;

namespace ControleFinanceiro.BLL.Models
{
    public class Mes
    {
        public int MesId { get; set; }

        public string Nome { get; set; }

        public virtual ICollection<Ganho> Ganhos { get; set; }

        public virtual ICollection<Despesa> Despesas { get; set; }
    }
}
