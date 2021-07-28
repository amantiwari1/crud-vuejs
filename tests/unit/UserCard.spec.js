import { mount } from '@vue/test-utils'
import UserCard from '../../src/components/UserCard'


describe('UserCard', () => {
  test('', () => {
    const wrapper = mount(UserCard, {
      propsData: {
        product: {
          email: "aman@gmail.com",
          name: "Aman Tiwari",
          gender: "Male",
        }
      }
    })
    expect(wrapper.find('#test-card-details').html()).toBe('<div id="test-card-details"><p class="capitalize">Aman Tiwari</p><p class="capitalize">Male</p><p>aman@gmail.com</p></div>');
  })

})