const data = [
    { college: 'College of Literature, Science, and the Arts (LSA)', enrollment: 29528 },
    { college: 'Ross School of Business', enrollment: 6026 },
    { college: 'College of Engineering', enrollment: 10301 },
    { college: 'School of Information', enrollment: 1176 },
    { college: 'School of Kinesiology', enrollment: 2173 },
    { college: 'School of Music, Theatre & Dance', enrollment: 1237 },
    { college: 'School of Nursing', enrollment: 1777 },
    { college: 'School of Public Health', enrollment: 1693 },
    { college: 'Stamps School of Art & Design', enrollment: 872 },
    { college: 'Taubman College of Architecture and Urban Planning', enrollment: 671 },
    { college: 'School of Dentistry', enrollment: 632 },
    { college: 'School of Education and Human Services', enrollment: 744 },
    { college: 'School of Environment and Sustainability', enrollment: 398 },
    { college: 'School of Information Science', enrollment: 66 },
    { college: 'School of Medicine', enrollment: 734 },
    { college: 'School of Pharmacy', enrollment: 599 },
    { college: 'Law School', enrollment: 1144 },
    { college: 'Gerald R. Ford School of Public Policy', enrollment: 355 },
    { college: 'School of Social Work', enrollment: 1132 }
];

const jsonData = JSON.stringify(data);

const blob = new Blob([jsonData], { type: 'application/json' });
const url = URL.createObjectURL(blob);

const link = document.createElement('a');
link.href = url;
link.download = 'enrollment.json';
document.body.appendChild(link);
link.click();
document.body.removeChild(link);
