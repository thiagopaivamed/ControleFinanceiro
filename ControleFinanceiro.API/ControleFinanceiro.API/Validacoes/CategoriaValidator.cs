using ControleFinanceiro.BLL.Models;
using FluentValidation;

namespace ControleFinanceiro.API.Validacoes
{
    public class CategoriaValidator : AbstractValidator<Categoria>
    {
        public CategoriaValidator()
        {
            RuleFor(c => c.Nome)
                .NotNull().WithMessage("Preencha o nome")
                .NotEmpty().WithMessage("Preencha o nome")
                .MinimumLength(6).WithMessage("Use mais caracteres")
                .MaximumLength(50).WithMessage("Use menos caracteres");

            RuleFor(c => c.Icone)
                .NotNull().WithMessage("Preencha o ícone")
                .NotEmpty().WithMessage("Preencha o ícone")
                .MinimumLength(1).WithMessage("Use mais caracteres")
                .MaximumLength(15).WithMessage("Use menos caracteres");

            RuleFor(c => c.TipoId)
                .NotNull().WithMessage("Escolha o tipo de categoria")
                .NotEmpty().WithMessage("Escolha o tipo de categoria");

        }
    }
}
