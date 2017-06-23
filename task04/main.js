const tagsInput = document.getElementById('ipt-tgs');
const tagsContainer = document.getElementById('id-tgs');
const hobbitBtn = document.getElementById('sel-hbts');
const hobbitContainer = document.getElementById('id-hbts');

tagsInput.addEventListener('input', (e) => {
  let value = e.target.value;
  let lastValue = value[value.length - 1];
  let pattern = /[,， ]/;
  if (pattern.test(lastValue)) {
    addTag(value);
  }
});

tagsInput.addEventListener('keydown', (e) => {
  let value = e.target.value;
  if (e.keyCode === 13) {
    addTag(value);
  }
});

hobbitBtn.addEventListener('click', (e) => {
  let value = document.getElementById('hbts-cts').value;
  addHobbit(value);
})

function addTag(value) {
  tagsInput.value = "";

  value = value.replace(/[,， ]/, '')

  if (value === '') {
    return;
  }

  for (let tag of tagsContainer.childNodes) {
    if (tag.innerText === value) {
      return;
    }
  }

  if (tagsContainer.childNodes.length === 10) {
    tagsContainer.removeChild(tagsContainer.childNodes[0]);
  }

  let newNode = document.createElement('span');
  newNode.setAttribute('onclick', 'removeThis(this)');
  newNode.innerHTML = value;
  tagsContainer.appendChild(newNode);
}

function removeThis(field) {
  field.parentNode.removeChild(field);
}

function addHobbit(value) {
  let hobbits = value.split(/[，,\n、\s+]/);
  let results = [];
  for (let hobbit of hobbits) {
    let isRepeat = false;
    for (let i = 0; i < results.length; i++) {
      if (hobbit === results[i]) {
        isRepeat = true;
        break;
      }
    }
    if (!isRepeat) {
      results.push(hobbit);
    }
  }

  for (let result of results) {
    if (result === '') {
      continue;
    }
    let isRepeat = false;
    result = result.trim();
    if (hobbitContainer.childNodes.length === 10) {
      hobbitContainer.removeChild(hobbitContainer.childNodes[0]);
    }

    for (let hobbit of hobbitContainer.childNodes) {
      if (hobbit.innerText === result) {
        isRepeat = true;
        break;
      }
    }

    if (!isRepeat) {
      let newNode = document.createElement('span');
      newNode.innerHTML = result;
      hobbitContainer.appendChild(newNode);
    }
  }
}