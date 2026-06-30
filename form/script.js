document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('orderForm');

  const hoursRadios = document.querySelectorAll('input[name="hours"]');
  const otherHoursInput = document.getElementById('other-hours-input');

  const typeRadios = document.querySelectorAll('input[name="event_type"]');
  const otherTypeInput = document.getElementById('other-type-input');

  // Toggle "Other" input for Hours
  hoursRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'Other') {
        otherHoursInput.classList.add('show');
        otherHoursInput.setAttribute('required', 'true');
      } else {
        otherHoursInput.classList.remove('show');
        otherHoursInput.removeAttribute('required');
      }
    });
  });

  // Toggle "Other" input for Event Type
  typeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
      if (e.target.value === 'Other') {
        otherTypeInput.classList.add('show');
        otherTypeInput.setAttribute('required', 'true');
      } else {
        otherTypeInput.classList.remove('show');
        otherTypeInput.removeAttribute('required');
      }
    });
  });

  // Handle Form Submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const datetime = document.getElementById('datetime').value;
    const venue = document.getElementById('venue').value;
    const pax = document.getElementById('pax').value;
    const eventLocation = document.querySelector('input[name="event_location"]:checked')?.value || 'Not specified';

    // Get selected hours
    let hours = document.querySelector('input[name="hours"]:checked')?.value;
    if (hours === 'Other') {
      hours = otherHoursInput.value;
    }

    // Get selected type
    let eventType = document.querySelector('input[name="event_type"]:checked')?.value;
    if (eventType === 'Other') {
      eventType = otherTypeInput.value;
    }

    // Disable past dates for datetime-local
    const datetimeInput = document.getElementById('datetime');
    if (datetimeInput) {
      const now = new Date();
      // Format to YYYY-MM-DDThh:mm
      now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
      datetimeInput.min = now.toISOString().slice(0, 16);
    }
    // Format Date: DD/MM/YYYY (HH:mm)
    const dateObj = new Date(datetime);
    const dd = String(dateObj.getDate()).padStart(2, '0');
    const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
    const yyyy = dateObj.getFullYear();
    const hh = String(dateObj.getHours()).padStart(2, '0');
    const min = String(dateObj.getMinutes()).padStart(2, '0');
    const formattedDate = `${dd}/${mm}/${yyyy} (${hh}:${min})`;

    // Build WhatsApp Message String
    const message = `*SAYCHEZ PHOTOBOOTH BOOKING REQUEST*

*Name:* ${name}
*Date & Time:* ${formattedDate}
*Package:* ${hours}
*Event Type:* ${eventType}
*Indoor/Outdoor:* ${eventLocation}
*No. of Pax:* ${pax}
*Venue:* ${venue}`;

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    const phoneNumber = "601156666373"; // Removed '+' sign for correct wa.me functioning

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  });


});

