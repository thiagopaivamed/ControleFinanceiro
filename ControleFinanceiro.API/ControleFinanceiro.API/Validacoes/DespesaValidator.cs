using ControleFinanceiro.BLL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Validacoes
{
    public class DespesaValidator : AbstractValidator<Despesa>
    {
        public DespesaValidator()
        {
            RuleFor(d => d.CartaoId)
                .NotEmpty().WithMessage("Escolha o cartão")
                .NotNull().WithMessage("Escolha o cartão");

            RuleFor(d => d.Descricao)
                .NotNull().WithMessage("Preencha a descrição")
                .NotEmpty().WithMessage("Preencha a descrição")
                .MinimumLength(1).WithMessage("Use mais caracteres")
                .MaximumLength(50).WithMessage("Use mais caracteres");

            RuleFor(d => d.Valor)
                .NotNull().WithMessage("Preencha o valor")
                .NotEmpty().WithMessage("Preencha o valor")
                .InclusiveBetween(0, double.MaxValue).WithMessage("Valor inválido");

            RuleFor(d => d.MesId)
                .NotEmpty().WithMessage("Escolha o mês")
                .NotNull().WithMessage("Escolha o mês");

            RuleFor(d => d.Ano)
               .NotNull().WithMessage("Preencha o ano")
               .NotEmpty().WithMessage("Preencha o ano")
               .InclusiveBetween(2016, 2024).WithMessage("Valor inválido");
        }
    }
}
