abstract class AbstractCtrl {

/*
*	Abstract controller in case needed basic functionality for different controllers which wasnt necessary
*/
  abstract model: any;

  //Find by id
  get = (req, res) => {
    this.model.findOne({ _id: req.params.id }, (err, obj) => {
      if (err) { return console.error(err); }
      res.json(obj);
    });
  };
}

export default AbstractCtrl;