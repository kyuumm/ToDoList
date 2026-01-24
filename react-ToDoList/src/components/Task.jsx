const Task = ({ name, details, id, provided, snapshot, handleUpdate, handleRemove }) => {
  return (
    <div
      className='task'
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      onClick={() => handleUpdate(id)}
    >
      {name && <h2 className={`${name ? 'task-name' : ''} over-hide`}>{name}</h2>}
      {details && <p className={`${details ? 'task-details' : ''}`}>{details}</p>}
      <div className='remove-bar' onClick={(e) => handleRemove(id, e)}>
      </div>
    </div>
  );
};
//条件渲染标题避免占位
export default Task;
