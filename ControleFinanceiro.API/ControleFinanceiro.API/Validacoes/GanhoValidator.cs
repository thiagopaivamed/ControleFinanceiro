using ControleFinanceiro.BLL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Validacoes
{
    public class GanhoValidator : AbstractValidator<Ganho>
    {
        public GanhoValidator()
        {
            RuleFor(g => g.Descricao)
                .NotNull().WithMessage("Digite a descrição")
                .NotEmpty().WithMessage("Digite a descrição")
                .MinimumLength(1).WithMessage("Use mais caracteres")
                .MaximumLength(50).WithMessage("Use menos caracteres");

            RuleFor(g => g.CategoriaId)
                .NotNull().WithMessage("Escolha a categoria")
                .NotEmpty().WithMessage("Escolha a categoria");

            RuleFor(g => g.Valor)
                .NotNull().WithMessage("Digite o valor")
                .NotEmpty().WithMessage("Digite o valor")
                .InclusiveBetween(0, double.MaxValue).WithMessage("Valor inválido");

            RuleFor(g => g.Dia)
                .NotNull().WithMessage("Digite o dia")
                .NotEmpty().WithMessage("Digite o dia")
                .InclusiveBetween(1, 31).WithMessage("Dia inválido");

            RuleFor(g => g.MesId)
                .NotNull().WithMessage("Escolha o mês")
                .NotEmpty().WithMessage("Escolha o mês");

            RuleFor(g => g.Ano)
                .NotNull().WithMessage("Digite o ano")
                .NotEmpty().WithMessage("Digite o ano")
                .InclusiveBetween(2016, 2024).WithMessage("Ano inválido");
        }
    }
}
