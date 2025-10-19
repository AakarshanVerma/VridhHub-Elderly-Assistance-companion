
import "../../styles/transport/BookBus.css"

const BookBus = () => {
  const [formData, setFormData] = ({
    name: '',
    mobile: '',
    from: '',
    to: '',
    date: '',
    busType: '',
    seats: '',
    slot: '',
    assist: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Bus Booking Submitted!\n' + JSON.stringify(formData, null, 2));
    // Here you can also send formData to your backend
  };

  return (
    <div>
      <header>Book a Bus</header>
      <nav>
        <a href="/">Home</a>
        <a href="/transport">Transport</a>
        <a href="/carpool">Carpool</a>
        <a href="/book-bus">Book Bus</a>
      </nav>

      <section>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Full Name:</label>
          <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />

          <label htmlFor="mobile">Mobile Number:</label>
          <input type="tel" id="mobile" name="mobile" required pattern="[0-9]{10}" value={formData.mobile} onChange={handleChange} />

          <label htmlFor="from">From (Departure City):</label>
          <input type="text" id="from" name="from" required value={formData.from} onChange={handleChange} />

          <label htmlFor="to">To (Arrival City):</label>
          <input type="text" id="to" name="to" required value={formData.to} onChange={handleChange} />

          <label htmlFor="date">Date of Journey:</label>
          <input type="date" id="date" name="date" required value={formData.date} onChange={handleChange} />

          <label htmlFor="busType">Bus Type:</label>
          <select id="busType" name="busType" required value={formData.busType} onChange={handleChange}>
            <option value="">-- Select Type --</option>
            <option value="AC">AC</option>
            <option value="Non-AC">Non-AC</option>
            <option value="Sleeper">Sleeper</option>
            <option value="Seater">Seater</option>
          </select>

          <label htmlFor="seats">Number of Seats:</label>
          <input type="number" id="seats" name="seats" min="1" max="10" required value={formData.seats} onChange={handleChange} />

          <label htmlFor="slot">Preferred Time Slot:</label>
          <select id="slot" name="slot" required value={formData.slot} onChange={handleChange}>
            <option value="">-- Select Time Slot --</option>
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Night">Night</option>
          </select>

          <label htmlFor="assist">Special Assistance (Optional):</label>
          <textarea
            id="assist"
            name="assist"
            placeholder="e.g., Wheelchair access, help boarding"
            value={formData.assist}
            onChange={handleChange}
          ></textarea>

          <input type="submit" value="Book Bus" />
        </form>
      </section>

      <footer>© 2025 Transport Services. All rights reserved.</footer>
    </div>
  );
};

export default BookBus;
