let produtos_estoque = document.querySelector(".produtos-estoque")
let produtos_loja = document.querySelector(".produtos-loja")
let itens_carrinho = document.querySelector(".itens-carrinho")

const LerEstoque = async () =>{
    let url = 'http://127.0.0.1:5000/estoque';
    const response = fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        return data.produtos
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      return await response
}
const LerCarrinho = async () =>{
    let url = 'http://127.0.0.1:5000/carrinho';
    const response = fetch(url, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {
        return data.produtos
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      return await response
}

const AddEstoque = async (id, tamanho, quantidade) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('tamanho', tamanho);  
    formData.append('quantidade', quantidade);  
    let url = 'http://127.0.0.1:5000/adiciona_estoque';
    await fetch(url, {
      method: 'put',
      body: formData
    })
      .then((response) => criarProdutosEstoque())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const RemoveEstoque = async (id, tamanho, quantidade) => {
    const formData = new FormData();
    formData.append('id', id);
    formData.append('tamanho', tamanho);  
    formData.append('quantidade', quantidade);  
    let url = 'http://127.0.0.1:5000/remove_estoque';
    await fetch(url, {
      method: 'put',
      body: formData
    })
      .then((response) => criarProdutosEstoque())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const AddCarrinho = async (id, tamanho, quantidade, nome, preco) => {
    console.log(id, tamanho, quantidade, nome, preco);
    const formData = new FormData();
    formData.append('id_produto', id);
    formData.append('tamanho', tamanho);  
    formData.append('qtd', quantidade);  
    formData.append('nome', nome);  
    formData.append('preco', preco); 
    let url = 'http://127.0.0.1:5000/carrinho';
    await fetch(url, {
      method: 'post',
      body: formData
    })
      .then((response) => criarProdutosCarrinho())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  const deleteItemCarrinho = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    let url = 'http://127.0.0.1:5000/carrinho';
    await fetch(url, {
      method: 'delete',
      body: formData
    })
      .then((response) => criarProdutosCarrinho())
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  async function capturaAddEstoque(element){
    const id = element.dataset.id
    const tamanho = element.dataset.tamanho
    const quantidade = document.querySelector(`.${tamanho}${id}`).value
    if(confirm("Deseja adicionar mais desse produto ao estoque?") && quantidade != ""){

        await AddEstoque(id,tamanho,quantidade)
    }else{
    }
  }


function criarProdutoEstoque(id, nome, preco, qtd_g, qtd_m, qtd_p){
    let div = document.createElement('div');
    div.className = "produto-estoque"
    div.innerHTML = `<img src="./images/${nome}.jpg" alt="">
    <div class="dados-produto-estoque">
        <div class="superior-produto-estoque">
            <p class="negrito-p">${nome}</p>
            <p class="negrito-p">Preço: R$ ${preco},00</p>
        </div>
        <div class="informação-tamanho-estoque">
            <p class="negrito-p">Quantidade tam. G: ${qtd_g}</p>
            <div class="adicionar-estoque">
                <p>Adicionar:</p>
                <input type="number" class="input-number G${id}">
                <img src="./images/confirm.svg" class="confirm" alt="confirm" data-id=${id} data-tamanho=G>
            </div>
        </div>
        <div class="informação-tamanho-estoque">
            <p class="negrito-p">Quantidade tam. M: ${qtd_m}</p>
            <div class="adicionar-estoque">
                <p>Adicionar:</p>
                <input type="number" class="input-number M${id}">
                <img src="./images/confirm.svg" class="confirm" alt="confirm" data-id=${id} data-tamanho=M>
            </div>
        </div>
        <div class="informação-tamanho-estoque">
            <p class="negrito-p">Quantidade tam. P: ${qtd_p}</p>
            <div class="adicionar-estoque">
                <p>Adicionar:</p>
                <input type="number" class="input-number P${id}">
                <img src="./images/confirm.svg" class="confirm" alt="confirm" data-id=${id} data-tamanho=P>
            </div>
        </div>
    </div>`
    produtos_estoque.appendChild(div)
}

async function criarProdutosEstoque(){
    produtos_estoque.innerHTML = ""
    let produtos = await LerEstoque()
    produtos.forEach(element => {
        criarProdutoEstoque(element.id, element.nome, element.preco, element.qtd_g, element.qtd_m, element.qtd_p)
    });
    let confirms = document.querySelectorAll(".confirm")
    confirms.forEach((confirm) =>{
        confirm.addEventListener('click', (element) =>{
            capturaAddEstoque(element.target)
        })
    })
}

function criarProdutoLoja(id,nome,preco){
 const produto_loja = document.createElement('div')
 produto_loja.className = "produto-loja"
 produto_loja.innerHTML = `<img src="./images/${nome}.jpg" alt="foto produto">
 <div class="nome-produto-loja">${nome}</div>
 <div class="labels">
     <label class="label">
         <input type="radio" name="produto" value="P" onchange=changeSelect(event)></input>
         <p>P</p>
     </label>
     <label class="label ">
         <input type="radio" name="produto" value="M" onchange=changeSelect(event)></input>
         <p>M</p>
     </label>
     <label class="label">
         <input type="radio" name="produto" value="G" onchange=changeSelect(event)></input>
         <p>G</p>
     </label>
 </div>
 <div class="quantidade-loja">
     <div onclick="alterarQuantidade(event)">-</div>
     <div><input type="number" name="quantidade-loja" id="quantidade-loja" value="0"></div>
     <div onclick="alterarQuantidade(event)">+</div>
 </div>
 <div class="btn-add-carrinho" onclick="addCarrinhoBtn(event)" data-id="${id}" data-preco="${preco}">ADICIONAR</div>`
 produtos_loja.appendChild(produto_loja)
}

async function criarProdutosLoja(){
    produtos_loja.innerHTML = ""
    let produtos = await LerEstoque()
    produtos.forEach(element => {
        criarProdutoLoja(element.id, element.nome,element.preco)
    });
}

function alterarQuantidade(event){
 input = event.target.parentNode.querySelector('input')
 console.log(input)
 if (event.target.innerText == "+"){
    input.value = parseInt(input.value) + 1
 }else{
    input.value>0 ? input.value = parseInt(input.value) - 1 : input.value = 0
 }
}

function changeSelect(event){
    const selected = event.target
    const label = selected.parentNode.parentNode
    console.log(label)
    const selects = label.querySelectorAll('.label')
    selects.forEach((label) =>{
        label.className = "label"
    })
    selected.parentNode.classList.add("checked")
}

function addCarrinhoBtn(event){
const produto = event.target.parentNode
console.log(produto)
const id = event.target.dataset.id
const preco = event.target.dataset.preco
const nome = produto.querySelector(".nome-produto-loja").innerText
const tamanho = produto.querySelector('input:checked').value
const quantidade = produto.querySelector(".quantidade-loja").querySelector("#quantidade-loja").value

AddCarrinho(id,tamanho,quantidade,nome,preco)
}

async function criarProdutosCarrinho(){
    const produtos = await LerCarrinho()
    let total = 0
    itens_carrinho.innerHTML = ""
    produtos.forEach((produto) =>{
        console.log(produto.preco, produto.qtd)
        total += parseInt(produto.preco) * parseInt(produto.qtd)
        const item_carrinho = document.createElement("div")
        item_carrinho.className = "item-carrinho"
        item_carrinho.innerHTML = `<img src="./images/${produto.nome}.jpg" alt="">
        <div class="centro-dados">
            <div class="title-dados-carrinho">${produto.nome}</div>
            <div class="dados-carrinho">
                <p class="tamanho-carrinho">Tamanho:${produto.tamanho}</p>
                <p class="preco-carrinho">Preço:R$${produto.preco},00</p>
                <p class="quantidade-carrinho">Quantidade:${produto.qtd}</p>
            </div>
        </div>
        <div class="delete-div">
            <img src="./images/lixeira.png" alt="" onclick=deleteItemCarrinho(${produto.id})>
        </div>`
        itens_carrinho.appendChild(item_carrinho)
        console.log(total)

    })
    let totalCompra=document.querySelector('.total-compra')
    totalCompra.innerText = `${total}`
    troco()

}

  function troco(){
    let totalCompra=document.querySelector('.total-compra').innerText
    let totalRecebido=document.querySelector('.secao-compra>input').value
    let troco = totalRecebido - totalCompra
    let trocoSpan = document.querySelector('.troco')

    if(troco < 0){
      troco = 0
      trocoSpan.innerText = troco
    }else{
      trocoSpan.innerText = troco
    }


  }

  async function vender(){
    const produtosEstoque = await LerCarrinho()
    let totalCompra=document.querySelector('.total-compra').innerText
    let totalRecebido=document.querySelector('.secao-compra>input').value
    if(totalRecebido < totalCompra){
      alert("Cliente não pagou todo valor necessario para realizar a compra")
      return null
    }
    document.querySelector('.secao-compra>input').value = ''
    produtosEstoque.forEach(async (item) => {
      let id = item.id
      let nome = item.nome
      let id_produto = item.id
      let quantidade = item.qtd
      let tamanho = item.tamanho
      let produtosEstoque = await LerEstoque()
      let produtoDoEstoque = produtosEstoque.filter((produto) =>{
        return produto.id == id_produto
      })
      console.log(produtoDoEstoque)
      switch (tamanho) {
        case "G":
          if(produtoDoEstoque[0].qtd_g < quantidade){
            alert(`Não foi possivel vender o item ${nome}, pois a quantidade solicitada é maior do que no estoque`)
          }else{
            await RemoveEstoque(id_produto,tamanho,quantidade)
            await deleteItemCarrinho(id)
          }
        break;
        case "M":
          if(produtoDoEstoque[0].qtd_m < quantidade){
            alert(`Não foi possivel vender o item ${nome}, pois a quantidade solicitada é maior do que no estoque`)
          }else{
            await RemoveEstoque(id_produto,tamanho,quantidade)
            await deleteItemCarrinho(id)
          }
        break;
        case "P":
          if(produtoDoEstoque[0].qtd_p < quantidade){
            alert(`Não foi possivel vender o item ${nome}, pois a quantidade solicitada é maior do que no estoque`)
          }else{
            await RemoveEstoque(id_produto,tamanho,quantidade)
            await deleteItemCarrinho(id)
          }
        break;
      }
    })  
    await criarProdutosCarrinho()
    
  }
criarProdutosEstoque()
criarProdutosLoja()
criarProdutosCarrinho()