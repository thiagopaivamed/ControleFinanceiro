using ControleFinanceiro.BLL.Models;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Security.Claims;
using System.Security.Cryptography.Xml;

namespace ControleFinanceiro.API.Services
{
    public static class TokenService
    {
        public static string GerarToken(Usuario usuario, string funcaoUsuario)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var chave = Encoding.ASCII.GetBytes(Settings.ChaveSecreta);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, usuario.UserName.ToString()),
                    new Claim(ClaimTypes.Role, funcaoUsuario)
                }),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(chave), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);            
        }
    }
}
