const sinon = require('sinon');
const { expect } = require('chai');
const productRegistration = require('../../models/productRegistration');
const salesModel = require('../../models/salesModel');
const salesModelProducts = require('../../models/productsSales');


const connection = require('../../models/connection');

describe('Cadastro de produtos', () => {
  describe('Verifica se possui o campo "name" existe, na requisição', () => {

    before(() => {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }])
    });

    after(() => {
      connection.execute.restore();
    });
    it('se não possuir o campo name', async () => {
      const response = await productRegistration.create('Matheus Bolado', 1);

      expect(response).to.be.equal(1)
    });
  });
  describe('Verifica se o campo name está presente na requisição', () => {
    const payload = [{ name: 'Oshiro Angel' }]
    before(() => {
      sinon.stub(connection, "execute").resolves(payload)
    });

    after(() => {
      connection.execute.restore();
    });
    it('se não possuir o campo name', async () => {
      const response = await productRegistration.productsName('Oshiro Angel');
      // console.log('oshiroDOMal', response);

      expect([response]).to.be.deep.equal(payload);
    });
  });

  describe('Verifica se é possivel fazer uma busca pelo id', () => {
    const payload = 1
    before(() => {
      sinon.stub(connection, "execute").resolves([payload])
    });

    after(async() => {
      connection.execute.restore();
    });
    it('é possivel buscar pelo id', async () => {
      const response = await productRegistration.getById([payload]);
      // console.log(response);
      expect(response).to.be.equal(payload);
    });
  });

  describe('Verifica se é possivel buscar todos os produtos', () => {
    // const payload 
    before(() => {
      sinon.stub(connection, "execute").resolves([{id: 1, quantity: 1, name: 'Oshirao Bolado'}]);
    });

    after(async() => {
      connection.execute.restore();
    });
    it('é possivel buscar pelo id', async () => {
      const response = await productRegistration.getAllProducts();
      // console.log(response);
      expect(response).to.have.property('id');
    });
  });
});

describe('Testa a camada sales model', () => {

  describe('sales', () => {
  before(() => {
    sinon.stub(connection, "execute").resolves([{ id: 5 }]);
  });
  after(() => {
    sinon.restore();
  });
  it('verifica se é possível buscar uma venda pelo id', async () => {
    const response = await salesModel.salesId(5);
    // console.log('cheguei');
    expect(response).to.have.property('id');
  });
});

  describe('Testa se a lista de sales', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([{ date: 2022/02/02, product_id: 5, quantity:10 }])
    });
    after(() => {
      sinon.restore();
    })
    it('testa se é possível obter a lista de sales', async () => {
      const response = await salesModel.list();
      expect(response).to.be.property('date');
    });
  });
});

describe('Testa products Sales', () => {

  describe('products', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([{ insertId: 1}]);
    });
    after(() => {
      sinon.restore();
    });
    it('testa se é possivel buscar a venda pelo id', async () => {
      const response = await salesModel.salesId(5);
      // console.log('cheguei');
      expect(response).to.have.property('insertId');
    });
});

  describe('Testa se é possivel vincular uma data à venda', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }])
    });
    after(() => {
      sinon.restore();
    })
    it('testa se é possível obter um id vinculado a venda', async () => {
      const response = await salesModelProducts.sales([{ date: 2022/02/02 }]);
      // console.log('OSHIRO BOLADO', response)
      expect(response).to.be.equal(1);
    });
  });
});


