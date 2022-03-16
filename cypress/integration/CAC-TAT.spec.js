/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function() {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação',function(){
            cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preenche os campos obrigatórios e envia o formulário', function() {
            const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
            cy.get('#firstName').type('Walmyr')
            cy.get('#lastName').type('Filho')
            cy.get('#email').type('walmyr@exemplo.com')
            cy.get('#open-text-area').type(longText,{delay: 0})
            cy.get('button[type="submit"]').click() //button is a class(tag) as you can see if you inspect (class="button") and type is a property
            cy.get('.success').should(function($success){
                expect($success[0].innerText).to.equal('Mensagem enviada com sucesso.')
            })
            //cy.get('.success').should(function($success){
              //  console.log($success)   //With this command is possible to check by Jquery some fields of the selected element
            //})
            //cy.get('.success').should('have.text','\n      Mensagem enviada com sucesso.\n    ')
            //cy.get('.success').should('be.visible')

    })// if I want to select the button by css_selector I should consider to add .button example: cy.get('.button').click()

    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
        cy.get('#firstName').type('Walmyr')
        cy.get('#lastName').type('Filho')
        cy.get('#email').type('walmyr@exemplo.com')
        cy.get('button[type="submit"]').click()
        cy.get('.error > strong').should('have.text','Valide os campos obrigatórios!')
        //cy.get('.error > strong').should('be.visible')
        //cy.get('.error > strong').should('be.equal','Valide os campos obrigatórios!')
    })

    it('Verificar se o campo telefone só aceita números', function(){
        const caracteres = 'abc'
        const numeros = '123'
        cy.get('#firstName').type(caracteres).should('have.value',caracteres)
        cy.get('#phone').type(numeros).should('have.value',numeros)
        cy.get('#phone').type('{selectall}{del}')
        cy.get('#phone').type(caracteres).should('have.value','')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
            cy.get('#firstName').type('Walmyr')
            cy.get('#lastName').type('Filho')
            cy.get('#email').type('walmyr@exemplo.com')
            cy.get('#open-text-area').type('Test')
            cy.get('#phone-checkbox').check()
            cy.get('button[type="submit"]').click()
            cy.get('.error > strong').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        const numeros = '123'
        const caracteres = 'abc'
        cy.get('#firstName').type(caracteres).should('have.value',caracteres).clear().should('have.value','')
        cy.get('#phone').type(numeros).should('have.value',numeros)
        cy.get('#phone').type('{selectall}{del}').should('have.value','')
    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        //cy.get('button[type="submit"]').click()
        cy.contains('button','Enviar').click()
    })

    it('envia o formuário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product').select('Mentoria').should('have.value','mentoria') //The select is checking by the text and the have.value is checking by the attribute value 
        //cy.get('select').select('Mentoria').should('have.value','mentoria') // Can also search by 'select' if it has only one select available
    })

    it('seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product').select('mentoria').should('have.value','mentoria')
    })

    it('seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product').select(2).should('have.value','cursos')
    })

    it('marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]').check().should('have.value','feedback')
    })

    it('marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]').should('have.length',3)
        .each(function($radio){ //the 'each' in this case act like a 'for' and is receiving a function in what we are going to describe down
            cy.wrap($radio).check().should('be.checked') //cy.wrap is used to package the element from radio and send commands such as 'check'
        })
    })

    it('marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]').check().should('be.checked').last().uncheck().should('not.be.checked')
    })

    it('seleciona um arquivo da pasta fixtures', function(){
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json')
        .should(function($file_upload){
            expect($file_upload[0].files[0].name).to.equal('example.json')
        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('#file-upload').selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
        .should(function($file_upload){
            expect($file_upload[0].files[0].name).to.equal('example.json')
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('Example1')  //fixture command get the files inside of the folder 'fixture' and 'as' command replace the name of the file for any other name
        cy.get('#file-upload').selectFile('@Example1')
        .should(function($file_upload){
            expect($file_upload[0].files[0].name).to.equal('example.json')
        })
        })// the fixtures are used to get informations from the files available at fixture folder

    it('acessa a página da política de privacidade removendo o target e então clicanco no link', function(){
        cy.get('#privacy a').invoke('removeAttr','target').click() //the invoke allows to edit the html code and remove the attribute target="_blank", generally this _blank redirect to a new tab
        cy.contains('Talking About Testing').should('be.visible')
    })

})
