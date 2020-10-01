using System.Collections.Generic;

namespace ControleFinanceiro.BLL.Models
{
    public class Cartao
    {
        public int CartaoId { get; set; }

        public string Nome { get; set; }

        public string Bandeira { get; set; }

        public string Numero { get; set; }

        public double Limite { get; set; }

        public string UsuarioId { get; set; }
        public Usuario Usuario { get; set; }

        public virtual ICollection<Despesa> Despesas { get; set; }
    }
}
