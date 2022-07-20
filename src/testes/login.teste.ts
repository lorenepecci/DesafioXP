import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { ClientesModel } from '../models/clientesModel';
import { get } from './mockDados/index';

chai.use(chaiHttp);
const { expect } = chai;

describe('em caso de sucesso do Login', () => {
  const clientesModel = new ClientesModel();
  before(() => {
    sinon.stub( clientesModel, 'getByEmail' ).resolves( get.response );
  });

  after(() => {
    (clientesModel.getByEmail as sinon.SinonStub).restore();
  });
});
