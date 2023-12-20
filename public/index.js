let cardElement = $('.card');
let input = $('.input');
let submit = $('.submit');

const rogerButton = $("#roger")
rogerButton.on('click', fetchRogerData);

const devButton = $(".dev")
devButton.on('click', fetchDevData);

submit.on('click', postNote)


async function fetchRogerData() {
    $('.card').empty();
    try {
        let cardData = await $.get('/roger');
        cardData.forEach((data) => {
            Object.keys(data).forEach((key) => {
                let note = $('<div class="note"></div>').text(`${key}: ${data[key]}`);
                cardElement.append(note);
            });
        });
    } catch (error) {
        console.error(error);
    }
}

async function fetchDevData() {
    $('.card').empty();
    try {
        let cardData = await $.get('/dev');
        cardData.forEach((data) => {
            Object.keys(data).forEach((key) => {
                let note = $('<div class="note"></div>').text(`${key}: ${data[key]}`);
                cardElement.append(note);
            });
        });
    } catch (error) {
        console.error(error);
    }
}

async function postNote() {
    try {
        let text = input.val()
        let newNote = await $.post('/roger', {note_text: text});
        console.log(newNote)
    } catch (err) {
        console.error(err)
    }
}


