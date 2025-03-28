// src/components/teacher/StudentsList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './TeacherStyles.css';


function StudentsList() {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', grade: '', notes: '' });
    const [editingStudent, setEditingStudent] = useState(null);
    const [isAddFormVisible, setIsAddFormVisible] = useState(false);

    useEffect(() => {
        // בפרויקט אמיתי, כאן תהיה קריאת API לקבלת רשימת תלמידים
        setStudents([
            { id: 1, name: 'יוסי כהן', grade: 'ג', notes: 'מתקשה בחיסור' },
            { id: 2, name: 'מיכל לוי', grade: 'ג', notes: 'מתקדמת מאוד' },
            { id: 3, name: 'דני גולן', grade: 'ב', notes: 'צריך תרגול נוסף' }
        ]);
    }, []);

    const handleInputChange = (e, form) => {
        const { name, value } = e.target;

        if (form === 'new') {
            setNewStudent({ ...newStudent, [name]: value });
        } else if (form === 'edit') {
            setEditingStudent({ ...editingStudent, [name]: value });
        }
    };

    const handleAddStudent = (e) => {
        e.preventDefault();

        if (!newStudent.name || !newStudent.grade) {
            alert('אנא מלא את השדות הנדרשים');
            return;
        }

        // בפרויקט אמיתי, כאן תהיה קריאת API להוספת תלמיד
        const newStudentWithId = {
            ...newStudent,
            id: students.length + 1
        };

        setStudents([...students, newStudentWithId]);
        setNewStudent({ name: '', grade: '', notes: '' });
        setIsAddFormVisible(false);
    };

    const handleEditClick = (student) => {
        setEditingStudent(student);
    };

    const handleUpdateStudent = (e) => {
        e.preventDefault();

        if (!editingStudent.name || !editingStudent.grade) {
            alert('אנא מלא את השדות הנדרשים');
            return;
        }

        // בפרויקט אמיתי, כאן תהיה קריאת API לעדכון תלמיד
        const updatedStudents = students.map(student =>
            student.id === editingStudent.id ? editingStudent : student
        );

        setStudents(updatedStudents);
        setEditingStudent(null);
    };

    const handleCancelEdit = () => {
        setEditingStudent(null);
    };

    const handleDeleteStudent = (studentId) => {
        if (window.confirm('האם אתה בטוח שברצונך למחוק תלמיד זה?')) {
            // בפרויקט אמיתי, כאן תהיה קריאת API למחיקת תלמיד
            const filteredStudents = students.filter(student => student.id !== studentId);
            setStudents(filteredStudents);
        }
    };

    return (
        <div className="students-list">
            <h2>ניהול תלמידים</h2>

            <div className="actions">
                <button
                    className="add-button"
                    onClick={() => setIsAddFormVisible(!isAddFormVisible)}
                >
                    {isAddFormVisible ? 'ביטול' : 'הוספת תלמיד חדש'}
                </button>
            </div>

            {isAddFormVisible && (
                <div className="form-container">
                    <h3>הוספת תלמיד חדש</h3>
                    <form onSubmit={handleAddStudent}>
                        <div className="form-group">
                            <label>שם:</label>
                            <input
                                type="text"
                                name="name"
                                value={newStudent.name}
                                onChange={(e) => handleInputChange(e, 'new')}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>כיתה:</label>
                            <input
                                type="text"
                                name="grade"
                                value={newStudent.grade}
                                onChange={(e) => handleInputChange(e, 'new')}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>הערות:</label>
                            <textarea
                                name="notes"
                                value={newStudent.notes}
                                onChange={(e) => handleInputChange(e, 'new')}
                            />
                        </div>

                        <button type="submit" className="submit-button">הוסף תלמיד</button>
                    </form>
                </div>
            )}

            {editingStudent && (
                <div className="form-container">
                    <h3>עריכת תלמיד</h3>
                    <form onSubmit={handleUpdateStudent}>
                        <div className="form-group">
                            <label>שם:</label>
                            <input
                                type="text"
                                name="name"
                                value={editingStudent.name}
                                onChange={(e) => handleInputChange(e, 'edit')}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>כיתה:</label>
                            <input
                                type="text"
                                name="grade"
                                value={editingStudent.grade}
                                onChange={(e) => handleInputChange(e, 'edit')}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>הערות:</label>
                            <textarea
                                name="notes"
                                value={editingStudent.notes}
                                onChange={(e) => handleInputChange(e, 'edit')}
                            />
                        </div>

                        <div className="button-group">
                            <button type="submit" className="submit-button">עדכן</button>
                            <button type="button" className="cancel-button" onClick={handleCancelEdit}>ביטול</button>
                        </div>
                    </form>
                </div>
            )}

            <table className="students-table">
                <thead>
                    <tr>
                        <th>שם</th>
                        <th>כיתה</th>
                        <th>הערות</th>
                        <th>פעולות</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.grade}</td>
                            <td>{student.notes}</td>
                            <td className="actions-cell">
                                <Link
                                    to={`/teacher/analytics/${student.id}`}
                                    className="analytics-button"
                                >
                                    ניתוח מעמיק
                                </Link>
                                <Link
                                    to={`/teacher/learning-plan/${student.id}`}
                                    className="plan-button"
                                >
                                    תכנית למידה
                                </Link>
                                <button
                                    className="edit-button"
                                    onClick={() => handleEditClick(student)}
                                >
                                    עריכה
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => handleDeleteStudent(student.id)}
                                >
                                    מחיקה
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default StudentsList;