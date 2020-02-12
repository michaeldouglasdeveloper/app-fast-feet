import * as Yup from 'yup';

import DeliveryMan from '../models/DeliveryMan';

class DeliveryManController {

  async store(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const response = await DeliveryMan.create(req.body);

    return res.status(200).json(response);
  }

  async update(req, res) {

    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryMan = await DeliveryMan.findByPk(req.params.id);

    if (!deliveryMan) {
      return res.status(400).json({ message: 'Delivery man not exists!' });
    }

    const { id, name, email } = deliveryMan.update(req.body);

    return res.json({ id, name, email });
  }

  async index(req, res) {

    const response = await DeliveryMan.findAll();

    if (!response) {
      return res.status(400).json({ message: 'Delivery mans not founds' });
    }

    return res.json(response);
  }

  async delete(req, res) {

    const { id } = req.params;

    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan) {
      return res.status(400).json({ message: 'Delivery man not exists!' });
    }

    const response = deliveryMan.destroy({ where: { id: id } });

    return res.json(response);

  }
}

export default new DeliveryManController();
