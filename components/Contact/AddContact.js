import React from 'react';
import { StyleSheet, TextInput, View, Text } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../FlatButton';
const reviewSchema = yup.object({
  Name: yup.string()
    .required()
    .min(2),
  Country: yup.string()
    .required()
    .min(2),
  Phone: yup.string()
  .required()
  .min(8),
  fph: yup.string()
    .required()
    .min(2)
});
export default function AddContact({ addReview }) {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ Name: '', Country: '', Phone: '' }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          actions.resetForm(); 
          addReview(values);
        }}>
        {props => (
          <View>
            <TextInput
              style={styles.input}
              placeholder='Add Name'
              onChangeText={props.handleChange('Name')}
              onBlur={props.handleBlur('Name')} 
              value={props.values.Name}
            />
            {/* Below is the validation for Name */}
            <Text style={styles.errorText}>{props.touched.Name && props.errors.Name}</Text>

            <TextInput
              style={styles.input}
              multiline minHeight={60}
              placeholder='Review Country'
              onChangeText={props.handleChange('Country')}
              onBlur={props.handleBlur('Country')}
              value={props.values.Country}
            />
            <Text style={styles.errorText}>{props.touched.Country && props.errors.Country}</Text>

            <TextInput 
              style={styles.input}
              placeholder='Phone (1 - 9)'
              onChangeText={props.handleChange('Phone')}
              onBlur={props.handleBlur('Phone')} 
              value={props.values.Phone}
              keyboardType='numeric'
            />
            <Text style={styles.errorText}>{props.touched.Phone && props.errors.Phone}</Text>
            
            <TextInput 
              style={styles.input}
              placeholder='Favorite Phone Brand'
              onChangeText={props.handleChange('fph')}
              onBlur={props.handleBlur('fph')} 
              value={props.values.fph}
            />
            <Text style={styles.errorText}>{props.touched.fph && props.errors.fph}</Text>     
            
            <FlatButton onPress={props.handleSubmit} text='submit' />
          </View>
        )}
      </Formik>
    </View>
    
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
  },
});