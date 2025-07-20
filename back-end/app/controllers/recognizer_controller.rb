class RecognizerController < ApplicationController
  def analyze
    input = params[:input].to_s
    steps = []
    steps << step("Passo 1", "Iniciando análise da entrada", "Entrada: \"#{input}\"")
    steps << step("Passo 2", "Contando 'a's no início da string", "Analisando caracteres: #{input.chars}")

    i = 0
    a_count = 0
    while i < input.length && input[i] == 'a'
      a_count += 1
      i += 1
    end

    prefix_a = input[0...a_count]
    steps << step("Passo 3", "Encontrados #{a_count} caractere(s) 'a' consecutivo(s)", "Prefixo de 'a's: \"#{prefix_a}\"")

    suffix_b = input[i..]
    steps << step("Passo 4", "Analisando o restante da string", "Sufixo restante: #{suffix_b.inspect}")

    if suffix_b.chars.all? { |ch| ch == 'b' }
      steps << step("Passo 5", "Verificação de caracteres aprovada", "Todos os caracteres restantes são 'b's")
    else
      steps << step("Passo 5", "Verificação de caracteres falhou", "Há caracteres diferentes de 'b' na sequência final")
      return render json: {
        valid: false,
        result: "String REJEITADA",
        steps: steps + [step("Passo Final", "String REJEITADA", "A string não está no formato aⁿbⁿ")]
      }
    end

    b_count = suffix_b.length
    steps << step("Passo 6", "Contados #{b_count} caractere(s) 'b'", "Sufixo de 'b's: \"#{suffix_b}\"")
    steps << step("Passo 7", "Comparando quantidades de 'a's e 'b's", "Quantidade de 'a's = #{a_count} | Quantidade de 'b's = #{b_count}")

    if a_count == b_count
      steps << step("Passo 8", "String ACEITA", "Padrão aⁿbⁿ reconhecido com sucesso")
      render json: {
        valid: true,
        result: "String ACEITA",
        steps: steps
      }
    else
      steps << step("Passo 8", "String REJEITADA", "Quantidades de 'a's e 'b's não são iguais")
      render json: {
        valid: false,
        result: "String REJEITADA",
        steps: steps
      }
    end
  end

  private

  def step(title, message, details)
    {
      title: title,
      message: message,
      details: details
    }
  end
end
