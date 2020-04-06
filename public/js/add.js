const locationForm = document.querySelector('#location-form');
const locationId = document.querySelector('#location-id');
const locationAddress = document.querySelector('#location-address');

async function addLocation(e) {
  e.preventDefault();

  if (locationId === '' || locationAddress === '') {
    alert('You should fill in fields');
  }

  const sendBody = {
    storeId: locationId.value,
    address: locationAddress.value
  };

  try {
    const res = await fetch('/api/v1/locations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendBody)
    });

    if (res.status === 400) {
      throw Error('Location already exists');
    }

    alert('Location added!');
    window.location.href = '/index.html';
  } catch (err) {
    alert(err);
    return;
  }
}

locationForm.addEventListener('submit', addLocation);
