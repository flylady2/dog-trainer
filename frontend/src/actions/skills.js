import moment from 'moment';

const formatTimestamp = 'ddd, MMM Do - h:mm a';

export const addSkill = (skill, dog) => {

  let content = `${dog.name} started learning ${skill.name}.`;
  let timestamp = moment().format(formatTimestamp);
  let note = {
    content: content,
    timestamp: timestamp,
    dog_id: dog.id
  }


  return dispatch => {
    dispatch({
      type: 'ADD_SKILL',
      skill: skill,
    });
    dispatch({
      type: 'ADD_NOTE',
      note: note
    });
    fetch('/skills', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(skill)
    }).then(resp => resp.json())
      .then(json => console.log('added skill to db!', json));
    fetch('/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(note)
    }).then(resp => resp.json())
      .then(json => console.log('added note to db!', json));
  }
}

export const removeSkill = skillId => {
  return dispatch => {
    dispatch({
      type: 'REMOVE_SKILL',
      skillId: skillId
    });
    fetch(`/skills/${skillId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(skillId)
    }).then(resp => resp.json())
      .then(json => console.log('deleted skill from db!', json));
  }
}

export const editSkill = (skill, rewardRate, dog, rateString) => {

  let content = `${dog.name} now receives reinforcement for ${skill.name} ${rateString} when successful.`;
  let timestamp = moment().format(formatTimestamp);
  let note = {
    content: content,
    timestamp: timestamp,
    dog_id: dog.id
  }

  return dispatch => {

    dispatch({
      type: 'EDIT_SKILL',
      skill: skill,
      rewardRate: rewardRate
    });
  }
}

export const fetchSkills = () => {
  return dispatch => {
    dispatch({ type: 'LOADING'});
    fetch('/skills')
      .then(resp => resp.json())
      .then(json => dispatch({ type: 'ADD_SKILLS', skills: json }));
  }
}
