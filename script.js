
    const tbody = document.querySelector("tbody");
    const descItem = document.querySelector("#desc");
    const valor = document.querySelector("#valor");
    const tipo = document.querySelector("#tipo")
    const botao = document.querySelector("#botao")

    const entrada = document.querySelector(".entrada");
    const saida = document.querySelector(".saida");
    const total = document.querySelector(".total");

    let items;
    
    botao.addEventListener("mouseover", (Event) => {
        Event.target.style.backgroundColor = "red";
        setTimeout(() => {
            Event.target.style.backgroundColor = "";
        }, 400);
    }); 

    botao.onclick = () => {
        if (descItem.value === "" || valor.value === "" || tipo.value === "") {
            return alert("Prencha os dados");
        }
        

        items.push({
            desc: descItem.value,
            valor: valor.value,
            tipo: tipo.value,
        });
        
        setItensDB();

        loadItens();

        descItem.value = "";
        valor.value = "";
        
    };
    
    function deleteItem(index){
        items.splice(index, 1);
        setItensDB();
        loadItens();

    }

    function insertItem(item, index){
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.desc}</td>
            <td>R$${item.valor}</td>
            <td class="tipoColuna">${
                item.tipo === "Entrada"
                  ? '<i class="bx bxs-chevron-up-circle"></i>'
                  : '<i class="bx bxs-chevron-down-circle"></i>'
              }</td>

            <td class="acaoColuna">
                <button onclick="deleteItem(${index})"<i class='bx bx-trash'></i></button></td>
        `;
        tbody.appendChild(tr);
    }


    //função que vai carregar na variavel 'items' as informações do banco de dados
    function loadItens(){
        items = getItensDB();
        tbody.innerHTML = "";
        items.forEach((item,index) => {
            insertItem(item,index);
        });

        getTotal();

    }

    function getTotal(){
        const quantidadeEntrada = items
            .filter((item) => item.tipo === "Entrada")
            .map((transaction) => Number(transaction.valor));


        const quantidadeSaida = items 
            .filter((item) => item.tipo === "Saida")
            .map((transaction) => Number(transaction.valor));

        const TotalEntradas = quantidadeEntrada.reduce((acc, cur) => acc + cur, 0);
            //acc = acumulador e cur = valor atual

        const TotalSaidas = quantidadeSaida.reduce((acc,cur) => acc + cur, 0);

        const totalItems = (TotalEntradas - TotalSaidas);
        
        entrada.innerHTML = TotalEntradas;
        saida.innerHTML = TotalSaidas;
        total.innerHTML = totalItems;

    }

    //função para pegar os dados do banco de dados local
    const getItensDB = () => JSON.parse(localStorage.getItem("db_items")) ?? [0];
    //função para inserir no banco de dados o que tem na variavel 'items'
    const setItensDB = () => localStorage.setItem("db_items", JSON.stringify(items));

    loadItens();

