import re

alvo = '11a22b33c'
regexp = r'(\d\d)(\w)'
resultado = re.search(regexp, alvo)
print(resultado.group(0))
print(resultado.group(1))
print(resultado.group(2))

# aplicando em loop
resultados = re.finditer(regexp, alvo)
for resultado in resultados:
	print('{} | {} | [{},{}]'
		.format(resultado.group(), resultado.group(1), 
			resultado.start(), resultado.end()))

# utilizando o compilador
exp = re.compile(regexp)
resultado = re.findall(exp, alvo)
print(resultado)


# substituindo valores

alvo = '01-12-2021'
exp = re.compile('-')

resultado = exp.sub('/', alvo)
print(resultado)
