using ControleFinanceiro.BLL.Models;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Validacoes
{
    public class CartaoValidator : AbstractValidator<Cartao>
    {
        public CartaoValidator()
        {
            RuleFor(c => c.Nome)
                .NotNull().WithMessage("Preencha o nome do cartão")
                .NotEmpty().WithMessage("Preencha o nome do cartão")
                .MinimumLength(1).WithMessage("Use mais caracteres")
                .MaximumLength(20).WithMessage("Use menos caracteres");

            RuleFor(c => c.Bandeira)
                .NotNull().WithMessage("Preencha a bandeira do cartão")
                .NotEmpty().WithMessage("Preencha a bandeira do cartão")
                .MinimumLength(1).WithMessage("Use mais caracteres")
                .MaximumLength(15).WithMessage("Use menos caracteres");

            RuleFor(c => c.Numero)
                .NotNull().WithMessage("Preencha o número do cartão")
                .NotEmpty().WithMessage("Preencha o número do cartão")
                .MinimumLength(1).WithMessage("Use mais caracteres")
                .MaximumLength(20).WithMessage("Use menos caracteres");

            RuleFor(c => c.Limite)
                .NotNull().WithMessage("Preencha o limite do cartão")
                .NotEmpty().WithMessage("Preencha o limite do cartão");
        }
    }
}
