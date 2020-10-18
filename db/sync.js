const init = (model, data = []) => model.bulkCreate(data);
const bcrypt = require('bcrypt');
// sequelize가 모델링 후의 시점에서 관여하게끔!
// models는 models 폴더의 index.js에서 export 하는 부분
const sync = async (sequelize, models) => {
  await sequelize.sync({ force: true });
  // server.js에서 db.sync({ fonce: true})와 같음
  await init(models.Users, [{
    username: 'test1',
    password: await bcrypt.hash('1234', 10),
    display_name: 'testname1',
    description: '테스트하는 유저1입니다',
    status: 'PUBLIC',
    created_at: 1602942793079,
  }, {
    username: 'test2',
    password: await bcrypt.hash('5678', 10),
    display_name: 'testname2',
    description: '테스트하는 유저2입니다',
    status: 'PRIVATE',
    created_at: 1602942793079,
  }]);
  await init(models.Posts, [
    {
      content: '보건 보건교사다',
      user_id: '1',
      created_at: 1602942793079,
      updated_at: Date.now(),
    },
    {
      content: '나는 안은영 나를 아느냐',
      user_id: '2',
      created_at: 1602942793079,
      updated_at: Date.now(),

    },
    {
      content: '보건교사다 잽싸게 도망가자 ',
      user_id: '1',
      created_at: 1602942793079,
      updated_at: Date.now(),

    },
  ]);
};

module.exports = sync;
