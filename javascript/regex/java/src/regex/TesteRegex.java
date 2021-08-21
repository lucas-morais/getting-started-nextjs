package regex;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class TesteRegex {
	
	public static void main(String[] args) {
		Pattern pattern = Pattern.compile("(\\d\\d)(\\w)");
		
		Matcher matcher = pattern.matcher("11a22b33c");
		
		while(matcher.find()) {
			String match = matcher.group();
			String group1 = matcher.group(1);
			String group2 = matcher.group(2);
			int start = matcher.start();
			int end = matcher.end();
			System.out.printf("%s | %s  | %s | [%d,%d]\n", match, group1, group2, start, end);
		}
	
		// substituindo
		Pattern dataPattern = Pattern.compile("(\\d{4})(-)(\\d{2})(-)(\\d{2})");
		Matcher dayMatcher = dataPattern.matcher("2021-12-01");
		String novoFormato = null;
		if(dayMatcher.matches()) {
			String dia = dayMatcher.group(5);
			String mes = dayMatcher.group(3);
			String ano = dayMatcher.group(1);
			String separador = dayMatcher.group(2);
			novoFormato = dia + separador + mes + separador + ano;
			System.out.println(novoFormato);
		}
		
		Pattern patternSeparador = Pattern.compile("-");
		String novaData = patternSeparador.matcher(novoFormato).replaceAll("/");
		System.out.println(novaData);
		System.out.println(novoFormato.replaceAll("-", "/"));
	}
}
