import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Upload, CheckCircle } from "lucide-react";

// Indian states data
const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", 
  "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
];

// Countries data
const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria", "Bangladesh", 
  "Belgium", "Brazil", "Canada", "China", "Denmark", "Egypt", "Finland", "France", "Germany", 
  "Greece", "Hong Kong", "Hungary", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", 
  "Italy", "Japan", "Kenya", "Malaysia", "Mexico", "Nepal", "Netherlands", "New Zealand", 
  "Norway", "Pakistan", "Philippines", "Poland", "Portugal", "Russia", "Saudi Arabia", 
  "Singapore", "South Africa", "South Korea", "Spain", "Sweden", "Switzerland", "Taiwan", 
  "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "USA", "Vietnam"
];

// Cities by state for India
const citiesByState: Record<string, string[]> = {
  "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool", "Tirupati", "Kadapa", "Anantapur", "Vizianagaram", "Eluru", "Ongole", "Nandyal", "Machilipatnam", "Adoni", "Tenali", "Chittoor", "Hindupur", "Proddatur", "Bhimavaram", "Madanapalle"],
  "Arunachal Pradesh": ["Itanagar", "Naharlagun", "Pasighat", "Bongaigaon", "Tawang", "Ziro", "Bomdila", "Seppa", "Roing", "Tezu", "Daporijo", "Khonsa", "Anini", "Yingkiong", "Pakke-Kessang", "Shi-Yomi", "Kamle", "Kra-Daadi", "Papum Pare", "Lower Siang"],
  "Assam": ["Guwahati", "Silchar", "Dibrugarh", "Jorhat", "Nagaon", "Tinsukia", "Tezpur", "Karimganj", "Sivasagar", "Goalpara", "Barpeta", "Bongaigaon", "Dhubri", "North Lakhimpur", "Morigaon", "Hailakandi", "Nalbari", "Darrang", "Charaideo", "Biswanath"],
  "Bihar": ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga", "Arrah", "Begusarai", "Chhapra", "Saharsa", "Samastipur", "Siwan", "Saran", "Vaishali", "Katihar", "Madhubani", "Gopalganj", "Nalanda", "Aurangabad", "Rohtas"],
  "Chhattisgarh": ["Raipur", "Bhilai", "Bilaspur", "Durg", "Rajnandgaon", "Jagdalpur", "Korba", "Ambikapur", "Raigarh", "Chirmiri", "Dhamtari", "Janjgir-Champa", "Baloda Bazar", "Kawardha", "Mungeli", "Bemetara", "Sukma", "Dantewada", "Bastar", "Narayanpur"],
  "Goa": ["Panaji", "Vasco da Gama", "Margao", "Mapusa", "Ponda", "Bicholim", "Curchorem", "Canacona", "Quepem", "Sanguem", "Cortalim", "Colva", "Candolim", "Calangute", "Anjuna", "Vagator", "Arambol", "Assagao", "Siolim", "Morjim"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Nadiad", "Bharuch", "Anand", "Morbi", "Surendranagar", "Gandhinagar", "Junagadh", "Porbandar", "Godhra", "Mehsana", "Veraval", "Gandhidham", "Navsari", "Dabhoi"],
  "Haryana": ["Faridabad", "Gurgaon", "Hisar", "Rohtak", "Panipat", "Karnal", "Sonipat", "Yamunanagar", "Panchkula", "Bhiwani", "Bahadurgarh", "Jind", "Sirsa", "Thanesar", "Kaithal", "Palwal", "Rewari", "Hansi", "Shahbad", "Narnaul"],
  "Himachal Pradesh": ["Shimla", "Mandi", "Solan", "Nahan", "Sirmaur", "Kullu", "Lahaul and Spiti", "Una", "Chamba", "Hamirpur", "Bilaspur", "Kangra", "Kinnaur", "Dharamshala", "Manali", "Palampur", "Sundernagar", "Baddi", "Nalagarh", "Jubbal"],
  "Jharkhand": ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro Steel City", "Deoghar", "Phusro", "Adityapur", "Hazaribagh", "Giridih", "Ramgarh", "Jhumri Tilaiya", "Saunda", "Sahibganj", "Pakur", "Simdega", "Dumka", "Chaibasa", "Chatra", "Latehar", "Palamu"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli-Dharwad", "Mangalore", "Belgaum", "Davangere", "Bellary", "Bijapur", "Shimoga", "Tumkur", "Raichur", "Hospet", "Bidar", "Hassan", "Gadag-Betigeri", "Kolar", "Udupi", "Chikmagalur", "Karwar", "Ranebennuru"],
  "Kerala": ["Thiruvananthapuram", "Kochi", "Kozhikode", "Kollam", "Thrissur", "Palakkad", "Alappuzha", "Malappuram", "Ponnani", "Vatakara", "Kanhangad", "Taliparamba", "Koyilandy", "Neyyattinkara", "Kayamkulam", "Nedumangad", "Kannur", "Tirur", "Kottayam", "Punalur"],
  "Madhya Pradesh": ["Indore", "Bhopal", "Jabalpur", "Gwalior", "Ujjain", "Sagar", "Ratlam", "Satna", "Dewas", "Mandasor", "Rewa", "Murwara", "Singrauli", "Burhanpur", "Khandwa", "Morena", "Bhind", "Chhindwara", "Guna", "Shivpuri"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Kalyan-Dombivali", "Vasai-Virar", "Solapur", "Mira-Bhayandar", "Bhiwandi", "Amravati", "Nanded", "Kolhapur", "Ulhasnagar", "Sangli-Miraj & Kupwara", "Malegaon", "Jalgaon", "Akola", "Latur"],
  "Manipur": ["Imphal", "Thoubal", "Bishnupur", "Churachandpur", "Chandel", "Ukhrul", "Senapati", "Tamenglong", "Kangpokpi", "Noney", "Pherzawl", "Tengnoupal", "Kamjong", "Kakching", "Tengnoupal", "Jiribam", "Kangpokpi", "Noney", "Pherzawl", "Tengnoupal"],
  "Meghalaya": ["Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar", "Baghmara", "Nongpoh", "Khliehriat", "Mairang", "Mawlai", "Cherrapunji", "Mawkyrwat", "Nongmynsong", "Resubelpara", "Shillong", "Tura", "Jowai", "Nongstoin", "Williamnagar", "Baghmara"],
  "Mizoram": ["Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", "Aizawl", "Lunglei", "Saiha", "Champhai", "Kolasib", "Serchhip", "Lawngtlai", "Hnahthial", "Khawzawl", "Saitual", "Damphu", "Biate", "Ngopa", "Hlaingbwe"],
  "Nagaland": ["Kohima", "Dimapur", "Mokokchung", "Tuensang", "Wokha", "Zunheboto", "Phek", "Mon", "Longleng", "Kiphire", "Zunheboto", "Phek", "Mon", "Longleng", "Kiphire", "Peren", "Noklak", "Tamlu", "Chizami", "Changpang"],
  "Odisha": ["Bhubaneswar", "Cuttack", "Raurkela", "Brahmapur", "Sambalpur", "Puri", "Balasore", "Bhadrak", "Baripada", "Bolangir", "Jharsuguda", "Paradip", "Bargarh", "Sundargarh", "Keonjhar", "Dhenkanal", "Talcher", "Angul", "Sonepur", "Nayagarh"],
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda", "Mohali", "Pathankot", "Moga", "Batala", "Malerkotla", "Khanna", "Sangrur", "Firozpur", "Kapurthala", "Faridkot", "Barnala", "Fazilka", "Tarn Taran", "Dasua", "Phagwara"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Bikaner", "Udaipur", "Ajmer", "Bhilwara", "Alwar", "Bharatpur", "Sikar", "Tonk", "Pali", "Dausa", "Rajsamand", "Hanumangarh", "Dholpur", "Sawai Madhopur", "Baran", "Jhalawar", "Churu", "Jhunjhunu"],
  "Sikkim": ["Gangtok", "Namchi", "Mangan", "Gyalshing", "Soreng", "Pakyong", "Rongli", "Chungthang", "Melli", "Ravangla", "Jorethang", "Khamdong", "Phodong", "Rangpo", "Singtam", "Martam", "Rhenock", "Daramdin", "Bongte", "Dentam"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur", "Ranipet", "Nagercoil", "Thanjavur", "Vellore", "Kancheepuram", "Erode", "Tiruvannamalai", "Pollachi", "Rajapalayam", "Sivakasi", "Pudukkottai", "Neyveli", "Ambur"],
  "Telangana": ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Ramagundam", "Khammam", "Mahbubnagar", "Nalgonda", "Adilabad", "Suryapet", "Jagtial", "Miryalaguda", "Bhongir", "Vikarabad", "Wanaparthy", "Yellandu", "Mancherial", "Koratla", "Peddapalli", "Nirmal"],
  "Tripura": ["Agartala", "Udaipur", "Dharmanagar", "Pratapgarh", "Kailashahar", "Belonia", "Khowai", "Ranir Bazar", "Sabroom", "Kamalpur", "Bishalgarh", "Jubarajnagar", "Teliamura", "Mohanpur", "Bagma", "Rajnagar", "Indranagar", "Jampui Hills", "Unakoti", "Gomati"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Meerut", "Varanasi", "Allahabad", "Amroha", "Moradabad", "Aligarh", "Saharanpur", "Noida", "Gorakhpur", "Jhansi", "Bareilly", "Faizabad", "Etawah", "Budaun", "Farrukhabad", "Mainpuri"],
  "Uttarakhand": ["Dehradun", "Haridwar", "Nainital", "Roorkee", "Rudrapur", "Kashipur", "Haldwani", "Rishikesh", "Udham Singh Nagar", "Pithoragarh", "Tehri Garhwal", "Chamoli", "Uttarkashi", "Bageshwar", "Almora", "Champawat", "Nainital", "Roorkee", "Rudrapur", "Kashipur"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Bardhaman", "Malda", "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Dhulian", "Ranaghat", "Haldia", "Raiganj", "Krishnanagar", "Bankura", "Chakdaha", "Darjeeling"],
  "Andaman and Nicobar Islands": ["Port Blair", "Diglipur", "Mayabunder", "Rangat", "Ferrargunj", "Little Andaman", "Car Nicobar", "Nancowry", "Great Nicobar", "Kamorta", "Trinkat", "Long Island", "Little Nicobar", "Katchal", "Teressa", "Tillanchong", "Smith", "Landfall Island", "Baratang", "Hut Bay"],
  "Chandigarh": ["Chandigarh", "Sector 17", "Sector 22", "Sector 9", "Sector 8", "Sector 34", "Sector 10", "Sector 26", "Sector 19", "Sector 11", "Sector 35", "Sector 27", "Sector 16", "Sector 37", "Sector 30", "Sector 21", "Sector 36", "Sector 15", "Sector 20", "Sector 9A"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Silvassa", "Dadra", "Nagar Haveli", "Vapi", "Valsad", "Navsari", "Daman Ganga", "Maghval", "Kadai", "Moti Daman", "Jetpur", "Pardi", "Sayan", "Bansda", "Dharampur", "Kunkeshwar", "Mithapur", "Lunavada"],
  "Lakshadweep": ["Kavaratti", "Agatti", "Amini", "Andrott", "Kalpeni", "Kadmat", "Bitra", "Chetlat", "Minicoy", "Kiltan", "Androth", "Bangaram", "Tinnakara", "Parali", "Pitti", "Suheli", "Tarakappalli", "Cheriyam", "Kallarack", "Munroe"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "North East Delhi", "North West Delhi", "South West Delhi", "South East Delhi", "Shahdara", "Delhi Cantonment", "Narela", "Vasant Vihar", "Dwarka", "Rohini", "Pitampura", "Lajpat Nagar", "Connaught Place", "Karol Bagh"],
  "Puducherry": ["Puducherry", "Karaikal", "Mahe", "Yanam", "Ozhukarai", "Ariyankuppam", "Villianur", "Thiruvettakudy", "Kottucherry", "Nedungadu", "Neykkarappatti", "Thirumalairayan Pattinam", "Trichy", "Vanjiyur", "Vembakkottai", "Vettavalam", "Villupuram", "Virasigamani", "Vridhachalam", "Vriddhachalam"]
};

// Cities by country
const citiesByCountry: Record<string, string[]> = {
  "India": [
    "Mumbai", "Delhi", "Bangalore", "Hyderabad", "Ahmedabad", "Chennai", "Kolkata", 
    "Surat", "Pune", "Jaipur", "Lucknow", "Kanpur", "Nagpur", "Indore", "Thane", 
    "Bhopal", "Visakhapatnam", "Pimpri-Chinchwad", "Patna", "Vadodara", "Ghaziabad", 
    "Ludhiana", "Agra", "Nashik", "Faridabad", "Meerut", "Rajkot", "Kalyan-Dombivali", 
    "Vasai-Virar", "Varanasi", "Srinagar", "Aurangabad", "Dhanbad", "Amritsar", 
    "Navi Mumbai", "Allahabad", "Ranchi", "Howrah", "Coimbatore", "Jabalpur", 
    "Gwalior", "Vijayawada", "Jodhpur", "Madurai", "Raipur", "Kota", "Guwahati", 
    "Chandigarh", "Solapur", "Hubli-Dharwad", "Mysore", "Tiruchirappalli", "Bareilly", 
    "Aligarh", "Tiruppur", "Gurgaon", "Moradabad", "Jalandhar", "Bhubaneswar", 
    "Salem", "Mira-Bhayandar", "Warangal", "Thiruvananthapuram", "Bhiwandi", 
    "Saharanpur", "Guntur", "Amravati", "Bikaner", "Noida", "Jamshedpur", "Bhilai", 
    "Cuttack", "Firozabad", "Kochi", "Nellore", "Bhavnagar", "Dehradun", "Durgapur", 
    "Asansol", "Rourkela", "Nanded", "Kolhapur", "Ajmer", "Akola", "Gulbarga", 
    "Jamnagar", "Ujjain", "Loni", "Siliguri", "Jhansi", "Ulhasnagar", "Nizamabad", 
    "Sangli-Miraj & Kupwara", "Mangalore", "Belgaum", "Ambattur", "Tirunelveli", 
    "Malegaon", "Gaya", "Jalgaon", "Udaipur", "Maheshtala", "Tiruvottiyur", 
    "Patiala", "Sambhal", "Shahjahanpur", "Bally", "Bhilwara", "Rajpur Sonarpur", 
    "Bharatpur", "Begusarai", "New Delhi", "Chhapra", "Khammam", "Bellary", 
    "Moga", "Chittoor", "Bihar Sharif", "Pali", "Raichur", "Panipat", "Davanagere", 
    "Parbhani", "Ichalkaranji", "Anantapur", "Hospet", "Karimnagar", "Shimoga", 
    "Tumkur", "Baranagar", "Karaikudi", "Rajnandgaon", "Hapur", "Anand", "Ongole", 
    "Karawal Nagar", "Bahraich", "Unnao", "Morbi", "Nainital", "Shrirampur", 
    "Durg", "Arrah", "Bharuch", "Nangloi Jat", "Thanjavur", "Bhatpara", "Kulti", 
    "Sambalpur", "Vizianagaram", "Bihar Sharif", "Pali", "Raichur", "Panipat", "Davanagere", 
    "Parbhani", "Ichalkaranji", "Anantapur", "Hospet", "Karimnagar", "Shimoga", 
    "Tumkur", "Baranagar", "Karaikudi", "Rajnandgaon", "Hapur", "Anand", "Ongole", 
    "Karawal Nagar", "Bahraich", "Unnao", "Morbi", "Nainital", "Shrirampur", 
    "Durg", "Arrah", "Bharuch", "Nangloi Jat", "Thanjavur", "Bhatpara", "Kulti", 
    "Sambalpur", "Vizianagaram", "Katni", "Singrauli", "Malda", "Sonipat", 
    "Farrukhabad", "Sagar", "Rourkela Industrial Township", "Dhule", "Haldia", 
    "Navsari", "Midnapore", "Mirzapur", "Bhind", "Nadiad", "Gandhidham", "Bhiwani", 
    "Bhatkal", "Tiruvannamalai", "Kumbakonam", "Munger", "Motihari", "Panchkula", 
    "Raigarh", "Rewa", "Palakkad", "Ramagundam", "Vellore", "Bodhan", "Rajahmundry", 
    "Rampur", "Shivamogga", "Bidar", "Nandyal", "Morena", "Chandrapur", "Hazaribagh", 
    "Guntakal", "Dibrugarh", "Bongaigaon", "Raebareli", "Jorhat", "Silchar", 
    "North Lakhimpur", "Tezpur", "Itanagar", "Naharlagun", "Aizawl", "Kohima", 
    "Shillong", "Imphal", "Aizawl", "Kohima", "Shillong", "Imphal"
  ],
  "USA": ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"],
  "UK": ["London", "Birmingham", "Manchester", "Glasgow", "Leeds", "Liverpool", "Newcastle", "Sheffield", "Bristol", "Leicester"],
  "Canada": ["Toronto", "Montreal", "Vancouver", "Calgary", "Edmonton", "Ottawa", "Winnipeg", "Quebec City", "Hamilton", "Kitchener"],
  "Australia": ["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide", "Gold Coast", "Newcastle", "Canberra", "Sunshine Coast", "Wollongong"],
  "Germany": ["Berlin", "Hamburg", "Munich", "Cologne", "Frankfurt", "Stuttgart", "Düsseldorf", "Leipzig", "Dortmund", "Essen"],
  "France": ["Paris", "Marseille", "Lyon", "Toulouse", "Nice", "Nantes", "Strasbourg", "Montpellier", "Bordeaux", "Lille"],
  "Japan": ["Tokyo", "Yokohama", "Osaka", "Nagoya", "Sapporo", "Fukuoka", "Kobe", "Kyoto", "Kawasaki", "Saitama"],
  "China": ["Shanghai", "Beijing", "Guangzhou", "Shenzhen", "Tianjin", "Wuhan", "Dongguan", "Chongqing", "Chengdu", "Nanjing"],
  "Brazil": ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador", "Fortaleza", "Belo Horizonte", "Manaus", "Curitiba", "Recife", "Porto Alegre"],
  "Other": ["Other"]
};

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  address: string;
  country: string;
  state: string;
  city: string;
  zipCode: string;
  currentPosition: string;
  currentCompany: string;
  totalExperience: string;
  skills: string;
  expertise: string;
  education: string;
  experience: string;
  portfolio: string;
  github: string;
  linkedin: string;
  coverLetter: string;
  declaration: boolean;
  resume: File | null;
}

const JobApplicationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const position = location.state?.position || "Software Engineer";
  const jobId = location.state?.jobId || null;

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    currentPosition: "",
    currentCompany: "",
    totalExperience: "",
    skills: "",
    expertise: "",
    education: "",
    experience: "",
    portfolio: "",
    github: "",
    linkedin: "",
    coverLetter: "",
    declaration: false,
    resume: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fileError, setFileError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Effect for automatic redirect after 2 seconds
  useEffect(() => {
    if (showSuccessModal) {
      const timer = setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccessModal, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    // Handle checkbox separately
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File size should not exceed 5MB.");
      } else {
        setFileError("");
        setFormData((prevData) => ({
          ...prevData,
          resume: file,
        }));
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        resume: null,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Create FormData object to handle file upload
      const formDataToSend = new FormData();
      
      // Add the fields that the backend expects
      formDataToSend.append('firstName', formData.firstName);
      formDataToSend.append('lastName', formData.lastName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('dob', formData.dob);
      formDataToSend.append('gender', formData.gender);
      formDataToSend.append('address', formData.address);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('state', formData.state);
      formDataToSend.append('city', formData.city);
      formDataToSend.append('zipCode', formData.zipCode);
      formDataToSend.append('currentPosition', formData.currentPosition);
      formDataToSend.append('currentCompany', formData.currentCompany);
      formDataToSend.append('totalExperience', formData.totalExperience);
      formDataToSend.append('skills', formData.skills);
      formDataToSend.append('expertise', formData.expertise);
      formDataToSend.append('education', formData.education);
      formDataToSend.append('experience', formData.experience);
      formDataToSend.append('portfolio', formData.portfolio);
      formDataToSend.append('github', formData.github);
      formDataToSend.append('linkedin', formData.linkedin);
      
      // Add position and jobId if available
      formDataToSend.append('position', position);
      if (jobId) {
        formDataToSend.append('jobId', jobId);
      }
      
      // Add name as combination of first and last name
      const fullName = `${formData.firstName} ${formData.lastName}`;
      formDataToSend.append('name', fullName);
      
      // Add message (cover letter)
      formDataToSend.append('message', formData.coverLetter);
      
      // Add resume file if it exists
      if (formData.resume instanceof File) {
        formDataToSend.append('resume', formData.resume);
      }

      // Log the form data for debugging
      console.log("Submitting application with data:", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        position: position,
        jobId: jobId
      });

      // Use the API URL from environment variables
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

      // Try to submit to the correct API endpoint
      const response = await fetch(`${API_URL}/applications/apply`, {
        method: "POST",
        body: formDataToSend,
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const result = await response.json();
        console.log("Application submitted successfully:", result);
        
        // Save application to localStorage for immediate display in dashboard
        const userEmail = formData.email; // Use the email from the form
        if (userEmail) {
          const existingApps = JSON.parse(localStorage.getItem(`apps_${userEmail}`) || "[]");
          const newApp = {
            _id: result.application._id,
            position: position,
            appliedAt: new Date().toISOString(),
            status: "Pending"
          };
          localStorage.setItem(`apps_${userEmail}`, JSON.stringify([newApp, ...existingApps]));
        }
        
        // Show success modal instead of redirecting
        setShowSuccessModal(true);
        // Reset form data after showing the modal
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          dob: "",
          gender: "",
          address: "",
          country: "",
          state: "",
          city: "",
          zipCode: "",
          currentPosition: "",
          currentCompany: "",
          totalExperience: "",
          skills: "",
          expertise: "",
          education: "",
          experience: "",
          portfolio: "",
          github: "",
          linkedin: "",
          coverLetter: "",
          declaration: false,
          resume: null,
        });
      } else {
        // Try to get error message from response
        let errorMessage = "Failed to submit application.";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
          console.error("Server error response:", errorData);
        } catch (e) {
          // If we can't parse JSON, use status text
          errorMessage = response.statusText || errorMessage;
        }
        setSubmitError(errorMessage);
      }
    } catch (error) {
      // More detailed error handling
      console.error("Submission error:", error);
      if (error instanceof TypeError && error.message.includes('fetch')) {
        setSubmitError("Network error - please check your connection and try again.");
      } else {
        setSubmitError("An unexpected error occurred while submitting the application. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle dashboard navigation
  const goToDashboard = () => {
    setShowSuccessModal(false);
    navigate("/dashboard");
  };

  useEffect(() => {
    if (!position) {
      navigate("/");
    }
  }, [position, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start mb-6">
          <button
            onClick={() => navigate("/careers")}
            className="inline-flex items-center bg-gradient-to-r from-orange-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Careers
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-orange-500 to-blue-500 p-6 md:p-8 text-white">
            <h1 className="text-3xl font-bold mb-2">Job Application</h1>
            <p className="opacity-90 text-lg">Position: {position}</p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            {/* Personal Information Section */}
            <fieldset className="border border-transparent rounded-xl p-6 mb-6 shadow-sm bg-white" 
              style={{ borderImage: "linear-gradient(to right, #ff6600, #007bff) 1" }}>
              <legend className="px-3 py-1 text-xl font-semibold bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
                Personal Information
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    name="email"
                    required
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                  <input
                    name="phone"
                    required
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                  <input
                    name="dob"
                    required
                    type="date"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Contact Details Section */}
            <fieldset className="border border-transparent rounded-xl p-6 mb-6 shadow-sm bg-white"
              style={{ borderImage: "linear-gradient(to right, #ff6600, #007bff) 1" }}>
              <legend className="px-3 py-1 text-xl font-semibold bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
                Contact Details
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Street Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                    disabled={!formData.country}
                    required
                  >
                    <option value="">Select State</option>
                    {formData.country === "India" ? (
                      indianStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))
                    ) : (
                      <option value="N/A">Not Applicable</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                    disabled={!formData.country}
                    required
                  >
                    <option value="">Select City</option>
                    {formData.country === "India" && formData.state ? (
                      (citiesByState[formData.state] || []).map((city: string) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))
                    ) : formData.country && citiesByCountry[formData.country] ? (
                      (citiesByCountry[formData.country] || []).map((city: string) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))
                    ) : (
                      <option value="">Select Country/State First</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                  <input
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    placeholder="Zip Code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>
            </fieldset>

            {/* Professional Information Section */}
            <fieldset className="border border-transparent rounded-xl p-6 mb-6 shadow-sm bg-white"
              style={{ borderImage: "linear-gradient(to right, #ff6600, #007bff) 1" }}>
              <legend className="px-3 py-1 text-xl font-semibold bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
                Professional Information
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Position</label>
                  <input
                    name="currentPosition"
                    value={formData.currentPosition}
                    onChange={handleInputChange}
                    placeholder="Current Position"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Company</label>
                  <input
                    name="currentCompany"
                    value={formData.currentCompany}
                    onChange={handleInputChange}
                    placeholder="Current Company"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Experience (Years)</label>
                  <input
                    name="totalExperience"
                    value={formData.totalExperience}
                    onChange={handleInputChange}
                    placeholder="Total Experience"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>
            </fieldset>

            {/* Skills & Expertise Section */}
            <fieldset className="border border-transparent rounded-xl p-6 mb-6 shadow-sm bg-white"
              style={{ borderImage: "linear-gradient(to right, #ff6600, #007bff) 1" }}>
              <legend className="px-3 py-1 text-xl font-semibold bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
                Skills & Expertise
              </legend>
              <div className="space-y-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Technical Skills</label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleInputChange}
                    placeholder="List your technical skills (e.g., JavaScript, React, Node.js...)"
                    className="w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Areas of Expertise</label>
                  <textarea
                    name="expertise"
                    value={formData.expertise}
                    onChange={handleInputChange}
                    placeholder="List your areas of expertise (e.g., Frontend Development, Database Design...)"
                    className="w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md resize-none"
                  />
                </div>
              </div>
            </fieldset>

            {/* Education Details Section */}
            <fieldset className="border border-transparent rounded-xl p-6 mb-6 shadow-sm bg-white"
              style={{ borderImage: "linear-gradient(to right, #ff6600, #007bff) 1" }}>
              <legend className="px-3 py-1 text-xl font-semibold bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
                Education Details
              </legend>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Educational Qualifications</label>
                <textarea
                  name="education"
                  value={formData.education}
                  onChange={handleInputChange}
                  placeholder="List your educational qualifications (Degree, University, Year...)"
                  className="w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md resize-none"
                />
              </div>
            </fieldset>

            {/* Experience Details Section */}
            <fieldset className="border border-transparent rounded-xl p-6 mb-6 shadow-sm bg-white"
              style={{ borderImage: "linear-gradient(to right, #ff6600, #007bff) 1" }}>
              <legend className="px-3 py-1 text-xl font-semibold bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
                Experience Details
              </legend>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience</label>
                <textarea
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="List your work experience (Company, Role, Duration, Responsibilities...)"
                  className="w-full min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md resize-none"
                />
              </div>
            </fieldset>

            {/* Additional Links Section */}
            <fieldset className="border border-transparent rounded-xl p-6 mb-6 shadow-sm bg-white"
              style={{ borderImage: "linear-gradient(to right, #ff6600, #007bff) 1" }}>
              <legend className="px-3 py-1 text-xl font-semibold bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
                Additional Links (Portfolio / GitHub / LinkedIn)
              </legend>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio URL</label>
                  <input
                    name="portfolio"
                    type="url"
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://yourportfolio.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                  <input
                    name="github"
                    type="url"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                  <input
                    name="linkedin"
                    type="url"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
                  />
                </div>
              </div>
            </fieldset>

            {/* Cover Letter Section */}
            <fieldset className="border border-transparent rounded-xl p-6 mb-6 shadow-sm bg-white"
              style={{ borderImage: "linear-gradient(to right, #ff6600, #007bff) 1" }}>
              <legend className="px-3 py-1 text-xl font-semibold bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
                Cover Letter / Message to HR
              </legend>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
                <textarea
                  name="coverLetter"
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Write a brief cover letter or message to HR..."
                  className="w-full min-h-[150px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md resize-none text-center placeholder:text-center"
                />
              </div>
            </fieldset>

            {/* Declaration & Consent Section */}
            <fieldset className="border border-transparent rounded-xl p-6 mb-6 shadow-sm bg-white"
              style={{ borderImage: "linear-gradient(to right, #ff6600, #007bff) 1" }}>
              <legend className="px-3 py-1 text-xl font-semibold bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text">
                Declaration & Consent
              </legend>
              <div className="mt-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    name="declaration"
                    checked={formData.declaration}
                    onChange={handleInputChange}
                    className="mt-1 mr-3 h-5 w-5 text-orange-600 rounded focus:ring-orange-500"
                    required
                  />
                  <label className="text-gray-700 text-sm">
                    I hereby declare that the information provided in this application is true and correct to the best of my knowledge. I understand that any false or misleading information may result in disqualification from the recruitment process or termination of employment if hired. I give my consent for the company to verify the information provided and contact my references.
                  </label>
                </div>
              </div>
            </fieldset>

            {/* Resume Upload Section */}
            <div className="border border-transparent rounded-xl p-6 mb-6 shadow-sm bg-white"
              style={{ borderImage: "linear-gradient(to right, #ff6600, #007bff) 1" }}>
              <div className="px-3 py-1 text-xl font-semibold bg-gradient-to-r from-orange-500 to-blue-500 text-transparent bg-clip-text mb-4">
                Resume Upload
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Your Resume *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-orange-400 transition-colors duration-300 bg-gray-50">
                  <Upload className="mx-auto w-12 h-12 text-gray-400 mb-4" />
                  <label htmlFor="resume" className="block cursor-pointer text-orange-600 font-medium text-lg hover:text-orange-700 transition-colors duration-300">
                    Click to Upload Resume
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="text-gray-500 text-sm mt-2">PDF, DOC, DOCX files only (Max 5MB)</p>
                  {formData.resume && (
                    <p className="text-sm mt-3 text-green-600 font-medium">{formData.resume.name}</p>
                  )}
                  {fileError && <p className="text-sm mt-2 text-red-600">{fileError}</p>}
                </div>
              </div>
            </div>

            {/* Submit Confirmation Section */}
            <fieldset className="border border-green-300 rounded-xl p-6 mb-6 shadow-sm bg-green-50">
              <legend className="px-3 py-1 text-xl font-semibold text-green-700">
                Submit Confirmation
              </legend>
              <div className="mt-4">
                <p className="text-gray-700">
                  By clicking "Submit Application", you confirm that all the information provided is accurate and complete. 
                  Your application will be reviewed by our HR team, and you will receive a confirmation email shortly.
                </p>
              </div>
            </fieldset>

            {submitError && <p className="text-red-600 text-sm text-center py-2">{submitError}</p>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !!fileError}
              className="w-full bg-gradient-to-r from-orange-500 to-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full transform transition-all duration-300 scale-100 animate-fadeIn">
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Application Submitted Successfully 🎉</h2>
              <p className="text-gray-600 mb-6">
                Thank you for applying! We'll review your application and get back to you soon.
              </p>
              <p className="text-gray-500 text-sm">
                Redirecting to your dashboard...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobApplicationForm;