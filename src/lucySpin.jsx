import React, { useState, useEffect, useCallback } from 'react';
import './LucySpin.css';

const API_BASE_URL = 'http://localhost:5004/api/luckySpin';
const MAX_ITEMS = 8;

const LucySpin = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ itemName:'', priority:1, reward:'', image:null, imageUrl:'' });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const clearMessages = () => { setTimeout(() => { setError(''); setMessage(''); }, 4000); };

  const fetchItems = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await fetch(`${API_BASE_URL}/items`);
      const data = await res.json();
      setItems(data);
    } catch (err) { setError(err.message || 'Failed to fetch'); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  const handleInputChange = e => setFormData({...formData, [e.target.name]: e.target.value});
  const handleFileChange = e => {
    const file = e.target.files[0];
    if(file) setFormData({...formData, image:file, imageUrl: URL.createObjectURL(file)});
  };

  const createFormDataPayload = (data) => {
    const payload = new FormData();
    payload.append('itemName', data.itemName);
    payload.append('priority', data.priority);
    payload.append('reward', data.reward);
    if(data.image) payload.append('image', data.image);
    return payload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.itemName || !formData.reward || !formData.priority || (!isEditing && !formData.image)){
      setError('Please fill all fields'); return;
    }
    setLoading(true); setError(''); setMessage('');
    try {
      const payload = createFormDataPayload(formData);
      const url = isEditing ? `${API_BASE_URL}/item/${formData._id}` : `${API_BASE_URL}/item-save`;
      const method = isEditing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, body: payload });
      const result = await res.json();
      if(!res.ok) throw new Error(result.error || 'Failed');
      setMessage(`Item ${isEditing?'updated':'created'} successfully!`);
      setFormData({ itemName:'', priority:1, reward:'', image:null, imageUrl:'' });
      setIsEditing(false);
      await fetchItems();
    } catch(err){ setError(err.message); } 
    finally { setLoading(false); clearMessages(); }
  };

  const handleEdit = item => { setFormData({...item, image:null}); setIsEditing(true); document.getElementById('item-form')?.scrollIntoView({behavior:'smooth'}); };
  const handleCancel = () => { setFormData({ itemName:'', priority:1, reward:'', image:null, imageUrl:'' }); setIsEditing(false); };
  const handleDelete = async id => { if(!window.confirm('Delete this item?')) return; setLoading(true); setError(''); setMessage('');
    try { const res = await fetch(`${API_BASE_URL}/item/${id}`, { method:'DELETE' }); const result = await res.json(); if(!res.ok) throw new Error(result.error || 'Failed'); setMessage('Deleted successfully'); await fetchItems(); } 
    catch(err){ setError(err.message); } finally { setLoading(false); clearMessages(); }
  };

  const getItemImageUrl = path => path || 'https://placehold.co/100x100/A855F7/ffffff?text=No+Image';

  return (
    <div className="lucy-container">
      <header className="lucy-header">
        <h1>Lucky Spin Item Administration</h1>
        <p>Manage the 8 possible rewards for the lucky spin wheel.</p>
      </header>

      {error && <div className="lucy-msg error">{error}</div>}
      {message && <div className="lucy-msg success">{message}</div>}
      {loading && <div className="lucy-msg loading">Processing...</div>}

      <section id="item-form" className="lucy-form-section">
        <h2>{isEditing ? 'Edit Item' : 'Add New Item'} {items.length >= MAX_ITEMS && !isEditing && '(Max 8 items)'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="lucy-form-group">
            <label>Item Name</label>
            <input type="text" name="itemName" value={formData.itemName} onChange={handleInputChange} required />
          </div>
          <div className="lucy-form-group">
            <label>Priority</label>
            <input type="number" name="priority" value={formData.priority} onChange={handleInputChange} required />
          </div>
          <div className="lucy-form-group">
            <label>Reward</label>
            <input type="text" name="reward" value={formData.reward} onChange={handleInputChange} required />
          </div>
          <div className="lucy-form-group">
            <label>Image {isEditing?'(New optional)':''}</label>
            <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
            {formData.imageUrl && <img src={getItemImageUrl(formData.imageUrl)} alt="preview" className="lucy-image-preview" />}
          </div>
          <div style={{display:'flex', gap:'1rem'}}>
            <button type="submit" className={`lucy-btn lucy-btn-primary`} disabled={!isEditing && items.length>=MAX_ITEMS}>{isEditing?'Update':'Add Item'}</button>
            {isEditing && <button type="button" className="lucy-btn lucy-btn-secondary" onClick={handleCancel}>Cancel</button>}
          </div>
        </form>
      </section>

      <section className="lucy-form-section">
        <h2>Current Items ({items.length}/8)</h2>
        <div className="lucy-item-list">
          {items.length === 0 ? <p>No items yet.</p> :
            items.map(item => (
              <div key={item._id} className="lucy-item-card">
                <img src={getItemImageUrl(`http://localhost:5004${item.imageUrl}`)} alt={item.itemName} className="lucy-item-img"/>
                <div className="lucy-item-details">
                  <p className="lucy-item-name">{item.itemName}</p>
                  <p className="lucy-item-reward">Reward: {item.reward}</p>
                  <p className="lucy-item-priority">Priority: {item.priority} | ID: {item._id}</p>
                </div>
                <div className="lucy-item-actions">
                  <button className="lucy-btn-edit" onClick={()=>handleEdit(item)}>Edit</button>
                  <button className="lucy-btn-delete" onClick={()=>handleDelete(item._id)}>Delete</button>
                </div>
              </div>
            ))
          }
        </div>
      </section>
    </div>
  );
};

export default LucySpin;
