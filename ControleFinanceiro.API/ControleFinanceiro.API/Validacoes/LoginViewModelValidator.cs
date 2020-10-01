using ControleFinanceiro.API.ViewModels;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ControleFinanceiro.API.Validacoes
{
    public class LoginViewModelValidator : AbstractValidator<LoginViewModel>
    {
        public LoginViewModelValidator()
        {
            RuleFor(l => l.Email)
                .NotNull().WithMessage("Preencha o email")
                .NotEmpty().WithMessage("Preencha o email")
                .MinimumLength(10).WithMessage("Use mais caracteres")
                .MaximumLength(50).WithMessage("Use menos caracteres");

            RuleFor(l => l.Senha)
                .NotNull().WithMessage("Preencha a senha")
                .NotEmpty().WithMessage("Preencha a senha")
                .MinimumLength(6).WithMessage("Use mais caracteres")
                .MaximumLength(50).WithMessage("Use menos caracteres");

        }
    }
}
