$(document).ready(function () {
  $.ajaxSetup({
    headers: {
      "Content-type": "application/json",
      "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzE2YmM4MGE5ODQyODNmMzA1MDFlYzEiLCJpYXQiOjE2NjI0MzQ0NTJ9.q3vzzSmDXh84j0ZvVPRm1eVeOYt0Ea80WmDoOCbDG7E',
    }
  });
  const parent = $('.parentcontainer')[0];
  const tasksAjax = {
    onload: () => {
      try {
        if ($(".parentcontainer").length === 0) {
          return;
        }
        tasksAjax.addListener();
      } catch (e) {
        console.log('Error', e);
      }
    },
    addListener: () => {
      const getTask = $(parent).find("#loadtask")[0];
      const postTask = $(parent).find("#addtask")[0];
      $(getTask).click(() => tasksAjax.getTask())
      $(postTask).click(() => tasksAjax.postTask())
    },

    getTask: () => {
      $.ajax({
        url: "http://localhost:3000/tasks",
        success: function (data) {
          console.log(data);
          let html = data.length ? '<p>Task Lists</p>' : '<p>No task found</p>';
          data.forEach(task => {
            html += `<p class='taskdesc' data-id=${task._id}><b>Desc: </b>${task.description} <br><br><b>completed: </b> <img src=${task.completed ? './image/tick.png' : './image/cross.png'} /></p>`;
          });
          $("#data").html(html);
          tasksAjax.deleteTask();
        },
        error: function (err) {
          console.log(JSON.parse(err.responseText))
        }
      });
    },
    postTask: () => {
      const body = {
        description: $('#task').val(),
        completed: $('input[type=radio]:checked').val()
      }
      $.ajax({
        method: 'POST',
        url: "http://localhost:3000/tasks",
        data: JSON.stringify(body),
        success: function (data, responsetext, statustxt) {
          console.log(data, responsetext, statustxt.status);
          tasksAjax.getTask();
        },
        error: function (err) {
          console.log(JSON.parse(err.responseText))
        }
      });
    },
    deleteTask: () => {
      $(".taskdesc").click((e) => {
        const element = $(e.target);
        const id = $(element).attr("data-id");
        console.log(id);
        $.ajax({
          method: 'DELETE',
          url: `http://localhost:3000/tasks/${id}`,
          success: function (data, responseText, statustxt) {
            console.log(data, responseText, statustxt);
          },
          error: function (err) {
            console.log(err);
          }
        })
      })
    },

  }
  tasksAjax.onload();
});