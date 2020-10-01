using System.Collections.Generic;

namespace ControleFinanceiro.BLL.Models
{
    public class Categoria
    {
        public int CategoriaId { get; set; }
        public string Nome { get; set; }
        public string Icone { get; set; }

        public int TipoId { get; set; }
        public Tipo Tipo { get; set; }

        public virtual ICollection<Despesa> Despesas { get; set; }

        public virtual ICollection<Ganho> Ganhos { get; set; }
    }
}
