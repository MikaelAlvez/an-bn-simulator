class RecognizerController < ApplicationController
  def analyze
    input = params[:input].to_s

    if valid_an_bn?(input)
      render json: { valid: true, message: "A string pertence à linguagem aⁿbⁿ." }
    else
      render json: { valid: false, message: "A string NÃO pertence à linguagem aⁿbⁿ." }
    end
  end

  private

  def valid_an_bn?(str)
    a_count = 0
    i = 0

    while i < str.length && str[i] == 'a'
      a_count += 1
      i += 1
    end

    b_count = 0
    while i < str.length && str[i] == 'b'
      b_count += 1
      i += 1
    end

    # Verifica se percorreu toda a string e se a quantidade de 'a's e 'b's é igual
    i == str.length && a_count == b_count
  end
end
