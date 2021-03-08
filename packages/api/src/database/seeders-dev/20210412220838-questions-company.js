'use strict';

const questions = require('../constants/question.constant');

module.exports = {
  up: async (queryInterface) => {
    const [categories] = await queryInterface.sequelize.query(
      `select * from public.jso_question_category`,
    );

    const categoriesByName = categories.reduce((acc, cur) => {
      acc[cur['category_name']] = cur;

      return acc;
    }, {});

    await queryInterface.sequelize.query(`
      insert into public.jso_question
      (question_text, question_category_id, question_key)
      VALUES
      ('${questions.company.office_location}', ${categoriesByName['company'].id}, 'office_location'),
      ('${questions.company.interview_count}', ${categoriesByName['company'].id}, 'interview_count'),
      ('${questions.company.company_project_count}', ${categoriesByName['company'].id}, 'company_project_count'),
      ('${questions.company.salary_currency}', ${categoriesByName['company'].id}, 'salary_currency')
      
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      truncate public.jso_question RESTART IDENTITY CASCADE;
    `);
  },
};
