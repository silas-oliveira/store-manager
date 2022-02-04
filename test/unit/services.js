const sinon = require('sinon');
const { expect } = require('chai');
const listServices = require('../../services/listServices') ;
const productModel = require('../../models/productRegistration');
const salesServices = require('../../services/salesServices');
const salesModel = require('../../models/salesModel');

const connection = require('../../models/connection');

describe('List Services', () => {
  describe('Verifica se é possivel buscar products', () => {

    before(() => {
      sinon.stub(connection, "execute").resolves([{ id: 1 }])
    });

    after(() => {
      connection.execute.restore();
    });
    it('se não possuir o campo name', async () => {
      const response = await listServices.getProducts();
      // console.log('test', response);

      expect(response).to.be.property('id');
    });
  });

  describe('Verifica o retorno quando não possui products', () => {

    before(() => {
      sinon.stub(connection, "execute").resolves([undefined])
    });

    after(() => {
      connection.execute.restore();
    });
    it('se não possuir o campo name', async () => {
      const response = await listServices.getProducts();

      expect(response).to.be.equal(undefined);
    })
  });
  describe('Verifica se é possivel deletar um produto', () => {

    before(() => {
      sinon.stub(connection, "execute").resolves([[{id: 1}]])
      sinon.stub(productModel, "getById").resolves([{id: 1}])
      sinon.stub(productModel, "delet").resolves({ affectedRows: 1 })

    });

    after(() => {
      sinon.restore();
    });
    it('verifica se é possivel deletar um produto', async () => {
      const response = await listServices.deletProduct(1);
      console.log('problema', response);

      expect(response).to.be.deep.equal({id: 1});
    })
  })
})

describe('testes dos sales', () => {
  describe('testa validateProductId', () => {
    before(() => {
      
    });

    after(() => {
      sinon.restore();
    });
    it('verifica se productId é valido', async () => {
      const response = await salesServices.validateProductId([{ product_id: 1 }]);
      // console.log('problema', response);

      expect(response).to.be.true;
    })
  })
  describe('testa salesById', () => {
    before(() => {
      sinon.stub(connection, "execute").resolves([{ saleId: 1 }])
    });

    after(() => {
      sinon.restore();
    });
    it('verifica se é possivel buscar uma venda pelo id', async () => {
      const response = await salesServices.salesById([{ saleId: 1 }]);
      // console.log('problema', response);

      expect(response).to.be.property('saleId');
    })
  })
});
