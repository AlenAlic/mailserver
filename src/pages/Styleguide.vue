<template>
  <div class="container">
    <div class="styleguide">
      <h1>Styleguide</h1>

      <div class="styleguide__component_block">
        <div class="styleguide__component_header">
          <h6>Buttons</h6>
        </div>
        <div class="styleguide__component_content styleguide__component_content__spread">
          <a href="#" class="button--cta">Button CTA</a>
          <a href="#" class="button">Button</a>
          <a href="#" class="button--alt">
            Button ALT
          </a>
          <a href="#" class="button--cta is-disabled" disabled>
            Button Disabled
          </a>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="styleguide__component_block">
            <div class="styleguide__component_header">
              <h6>Spinners</h6>
            </div>
            <div class="styleguide__component_content styleguide__component_content__spread">
              <div class="spinner_grow"></div>
              <div class="spinner_grow--small"></div>
              <div class="spinner_border"></div>
              <div class="spinner_border--small"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="styleguide__component_block">
        <div class="styleguide__component_header">
          <h6>Forms</h6>
        </div>
        <div class="styleguide__component_content">
          <form class="form">
            <div class="form__group">
              <label class="form__label">
                These are your options:
              </label>
              <div class="checkbox is-inline">
                <input class="checkbox__cb" type="checkbox" id="cb" />
                <label class="checkbox__label" for="cb">
                  Optie 1
                </label>
              </div>
              <div class="checkbox is-inline">
                <input class="checkbox__cb" type="checkbox" id="cb_2" />
                <label class="checkbox__label" for="cb_2">
                  Optie 2
                </label>
              </div>
            </div>
            <div class="form__group">
              <label class="form__label">
                Choose an option:
              </label>
              <div class="radio is-inline">
                <input class="radio__rb" type="radio" name="radio" id="radio" />
                <label class="radio__label" for="radio">
                  Radio button 1
                </label>
              </div>
              <div class="radio is-inline">
                <input class="radio__rb" type="radio" name="radio" id="radio_1" />
                <label class="radio__label" for="radio_1">
                  Radio button 2
                </label>
              </div>
              <div class="radio is-inline">
                <input class="radio__rb" type="radio" name="radio" id="radio_2" />
                <label class="radio__label" for="radio_2">
                  Radio button 3
                </label>
              </div>
            </div>
            <div class="form__group">
              <label class="form__label">
                Text field 1
              </label>
              <input class="form__input--text" type="text" placeholder="This is an input field" />
            </div>

            <div class="form__group">
              <label class="form__label">
                Textarea
              </label>
              <textarea class="form__input--textarea" placeholder="Start typing here..."></textarea>
            </div>

            <div class="form__group">
              <label class="form__label">
                Textarea
              </label>
              <textarea
                class="form__input--textarea has-error"
                placeholder="Start typing here..."
              ></textarea>
              <span class="form__error_text">
                Error description
              </span>
            </div>
            <div class="form__group">
              <label class="form__label">
                Disabled text field
              </label>
              <input
                class="form__input--text"
                type="text"
                placeholder="This is an disabled input field"
                disabled
              />
            </div>

            <div class="form__group">
              <label class="form__label">
                Text field with an error
              </label>
              <input
                class="form__input--text has-error"
                type="text"
                placeholder="Dit is an input field with an error"
                value="test"
              />
              <span class="form__error_text">
                Error description
              </span>
            </div>
            <div class="form__group">
              <label class="form__label">
                This is a select
              </label>
              <div class="select">
                <select>
                  <option>Choose...</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            </div>
            <div class="form__group">
              <label class="form__label">
                This is an error select
              </label>
              <div class="select has-error">
                <select>
                  <option>Choose...</option>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
              <span class="form__error_text">
                Error description
              </span>
            </div>
            <div class="form__group">
              <label class="form__label">
                This is a dropdown
              </label>
              <v-select
                v-model="selected"
                :options="['Dropdown Item 1', 'Dropdown Item 2', 'Dropdown Item 3']"
                value="Item 1"
                placeholder="Choose an item..."
              ></v-select>
            </div>
            <div class="form__group">
              <label class="form__label">
                This is a multiple select dropdown
              </label>
              <v-select
                multiple
                :options="['First item', 'Second item', 'Third item']"
                placeholder="Choose an item..."
              ></v-select>
            </div>
            <div class="form__group">
              <label class="form__label">
                This is a dropdown
              </label>
              <v-select
                class="has-error"
                :options="['Dropdown Item 1', 'Dropdown Item 2', 'Dropdown Item 3']"
                value="Item 1"
                placeholder="Choose an item..."
              ></v-select>
              <span class="form__error_text">
                Error description
              </span>
            </div>

            <div class="form__buttons">
              <button type="submit" href="#" class="form__button button--cta">
                Button
              </button>
              <a href="#" class="form__button button--alt">
                Cancel
              </a>
            </div>
          </form>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="styleguide__component_block">
            <div class="styleguide__component_header">
              <h6>Search</h6>
            </div>
            <div class="styleguide__component_content">
              <div class="styleguide__item">
                <form class="search">
                  <input class="search__input" type="search" placeholder="Search.." />
                  <button class="search__button button--cta" type="submit">
                    Search
                  </button>
                </form>
              </div>
              <div class="styleguide__item">
                <form class="search">
                  <input class="search__input" type="search" placeholder="Search.." />
                  <button class="search__button button" type="submit">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="styleguide__component_block">
            <div class="styleguide__component_header">
              <h6>Alerts</h6>
            </div>
            <div class="styleguide__component_content">
              <div class="row">
                <div class="col-sm-2 col-md-3"></div>
                <div class="col-12 col-md-8 col-lg-6">
                  <div class="styleguide__item">
                    <div class="alert">
                      This is a normal information alert!
                    </div>
                  </div>
                  <div class="styleguide__item">
                    <div class="alert--success">
                      This is a success alert!
                    </div>
                  </div>
                  <div class="styleguide__item">
                    <div class="alert--warning">
                      This is a warning alert
                    </div>
                  </div>
                  <div class="styleguide__item">
                    <div class="alert--error">
                      This is an error alert
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="styleguide__component_block">
            <div class="styleguide__component_header">
              <h6>Teksten</h6>
            </div>
            <div class="styleguide__component_content">
              <h1>This is an H1 text</h1>
              <h2>This is an H2 text</h2>
              <h3>This is an H3 text</h3>
              <h4>This is an H4 text</h4>
              <h5>This is an H5 text</h5>
              <h6>This is an H6 text</h6>
              <p>
                This is a short text to present what some standard,
                <strong>bold</strong>
                and
                <i>italic</i>
                text and
                <a href="#">a link</a>
                would look like.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="styleguide__component_block">
            <div class="styleguide__component_header">
              <h6>Breadcrumb</h6>
            </div>
            <div class="styleguide__component_content">
              <ul class="breadcrumb">
                <li>
                  <a href="#">Home</a>
                  <i class="breadcrumb__icon mdi mdi-chevron-right"></i>
                </li>
                <li>
                  <a href="#">Category</a>
                  <i class="breadcrumb__icon mdi mdi-chevron-right"></i>
                </li>
                <li>Even more nested</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="styleguide__component_block">
            <div class="styleguide__component_header">
              <h6>Pagination</h6>
            </div>
            <div class="styleguide__component_content has-component-centered">
              <ul class="pagination">
                <li class="active"><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#">3</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="styleguide__component_block">
        <div class="styleguide__component_header">
          <h6>Modal</h6>
        </div>
        <div class="styleguide__component_content styleguide__component_content__buttons">
          <button class="button--cta" @click="showStyleguideModal">
            Open modal
          </button>
          &nbsp;
          <button class="button--cta" @click="showStyleguideModalSmall">
            Open small modal
          </button>
        </div>
      </div>

      <div class="styleguide__component_block">
        <div class="styleguide__component_header">
          <h6>Tooltips</h6>
        </div>
        <div class="styleguide__component_content">
          <div class="row">
            <div class="col-6">
              <span
                :data-tooltip="`You've been on this page ${tooltip} seconds`"
                data-tooltip-pos="up"
              >
                <i class="mdi mdi-cursor-pointer"></i>
                Reactive tooltip
              </span>
              <br />
              <span data-tooltip="This tooltip is positioned at the top!" data-tooltip-pos="up">
                <i class="mdi mdi-cursor-pointer"></i>
                Top tooltip
              </span>
              <br />
              <span data-tooltip="This one's on right!" data-tooltip-pos="right">
                <i class="mdi mdi-cursor-pointer"></i>
                Right tooltip
              </span>
              <br />
              <span data-tooltip="And on left!" data-tooltip-pos="left">
                <i class="mdi mdi-cursor-pointer"></i>
                Left tooltip
              </span>
              <br />
              <span
                data-tooltip="This tooltip is positioned at the bottom!"
                data-tooltip-pos="down"
              >
                <i class="mdi mdi-cursor-pointer"></i>
                Bottom tooltip
              </span>
            </div>
            <div class="col-6">
              <span data-tooltip="NL/EN" data-tooltip-length="small" data-tooltip-pos="up">
                <i class="mdi mdi-cursor-pointer"></i>
                Small tooltip
              </span>
              <br />
              <span
                data-tooltip="Now that's a super big text we have over here right? Lorem ipsum dolor sit I'm done."
                data-tooltip-length="medium"
                data-tooltip-pos="up"
              >
                <i class="mdi mdi-cursor-pointer"></i>
                Medium tooltip
              </span>
              <br />
              <span
                data-tooltip="What about something really big? This may surpass your window dimensions. Imagine you're on that boring class with that boring teacher and you didn't slept so well last night. Suddenly you're sleeping in class. Can you believe it?!"
                data-tooltip-length="large"
                data-tooltip-pos="up"
              >
                <i class="mdi mdi-cursor-pointer"></i>
                Large tooltip
              </span>
              <br />
              <span
                data-tooltip="What about something really big? This may surpass your window dimensions. Imagine you're on that boring class with that boring teacher and you didn't slept so well last night. Suddenly you're sleeping in class. Can you believe it?!"
                data-tooltip-length="xlarge"
                data-tooltip-pos="up"
              >
                <i class="mdi mdi-cursor-pointer"></i>
                Extra large tooltip
              </span>
              <br />
              <span
                data-tooltip-visible
                data-tooltip="I'll stick around 😉"
                data-tooltip-pos="right"
              >
                <i class="mdi mdi-cursor-pointer"></i>
                Always visible tooltip
              </span>
              <br />
            </div>
          </div>
        </div>
      </div>

      <div class="styleguide__component_block">
        <div class="styleguide__component_header">
          <h6>Table</h6>
        </div>
        <div class="styleguide__component_content">
          <div class="styleguide__item">
            <div class="table__responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th class="table__wrap">Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th class="table__cell--icon">
                      Remarks
                    </th>
                    <th class="table__cell--date">
                      Last edit
                    </th>
                    <th class="table__cell--icon"></th>
                    <th class="table__cell--icon"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td class="table__wrap">
                      This is the name of some item in this table
                    </td>
                    <td>Type 1</td>
                    <td>Approved</td>
                    <td>
                      <span
                        data-tooltip="In this tooltip the first words of the remarks will be visible…"
                        data-tooltip-pos="up"
                        data-tooltip-length="large"
                      >
                        <span class="table__icon mdi mdi-message-text"></span>
                      </span>
                    </td>
                    <td>10-11-2017</td>
                    <td>
                      <span data-tooltip="Edit" data-tooltip-pos="up">
                        <span class="table__icon mdi mdi-pencil"></span>
                      </span>
                    </td>
                    <td>
                      <span data-tooltip="Delete" data-tooltip-pos="up">
                        <span class="table__icon mdi mdi-delete"></span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td class="table__wrap">
                      This is the name of some item in this table
                    </td>
                    <td>Type 2</td>
                    <td>Approved</td>
                    <td>
                      <span
                        data-tooltip="In this tooltip the first words of the remarks will be visible…"
                        data-tooltip-pos="up"
                        data-tooltip-length="large"
                      >
                        <span class="table__icon mdi mdi-message-text"></span>
                      </span>
                    </td>
                    <td>10-11-2017</td>
                    <td>
                      <span data-tooltip="Edit" data-tooltip-pos="up">
                        <span class="table__icon mdi mdi-pencil"></span>
                      </span>
                    </td>
                    <td>
                      <span data-tooltip="Delete" data-tooltip-pos="up">
                        <span class="table__icon mdi mdi-delete"></span>
                      </span>
                    </td>
                  </tr>
                  <tr class="table__row--sub">
                    <td></td>
                    <td class="table__wrap">
                      <i class="table__icon mdi mdi-subdirectory-arrow-right"></i>
                      Subitem 1
                    </td>
                    <td>Type 2</td>
                    <td colspan="5"></td>
                  </tr>
                  <tr class="table__row--sub">
                    <td></td>
                    <td class="table__wrap">
                      <i class="table__icon mdi mdi-subdirectory-arrow-right"></i>
                      Subitem 2
                    </td>
                    <td>Type 3</td>
                    <td colspan="5"></td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td class="table__wrap">
                      This is another table item
                    </td>
                    <td>Type 4</td>
                    <td>Approved</td>
                    <td>
                      <span
                        data-tooltip="In this tooltip the first words of the remarks will be visible…"
                        data-tooltip-pos="up"
                        data-tooltip-length="large"
                      >
                        <span class="table__icon mdi mdi-message-text"></span>
                      </span>
                    </td>
                    <td>10-11-2017</td>
                    <td>
                      <span data-tooltip="Edit" data-tooltip-pos="up">
                        <span class="table__icon mdi mdi-pencil"></span>
                      </span>
                    </td>
                    <td>
                      <span data-tooltip="Delete" data-tooltip-pos="up">
                        <span class="table__icon mdi mdi-delete"></span>
                      </span>
                    </td>
                  </tr>
                  <tr class="table__row--sub">
                    <td></td>
                    <td class="table__wrap">
                      <i class="table__icon mdi mdi-subdirectory-arrow-right"></i>
                      Subitem 3
                    </td>
                    <td>Type 5</td>
                    <td colspan="5"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="styleguide__item">
            <div class="table__responsive">
              <table class="table--alt">
                <thead>
                  <tr>
                    <th>#</th>
                    <th class="table__wrap">Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th class="table__cell--icon">
                      Remarks
                    </th>
                    <th class="table__cell--date">
                      Last edit
                    </th>
                    <th class="table__cell--icon"></th>
                    <th class="table__cell--icon"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td class="table__wrap">
                      This is the name of some item in this table
                    </td>
                    <td>Type 1</td>
                    <td>Approved</td>
                    <td>
                      <span
                        data-tooltip="In this tooltip the first words of the remarks will be visible…"
                        data-tooltip-pos="up"
                        data-tooltip-length="large"
                      >
                        <span class="table__icon mdi mdi-message-text"></span>
                      </span>
                    </td>
                    <td>10-11-2017</td>
                    <td>
                      <span data-tooltip="Edit" data-tooltip-pos="up">
                        <span class="table__icon mdi mdi-pencil"></span>
                      </span>
                    </td>
                    <td>
                      <span data-tooltip="Delete" data-tooltip-pos="up">
                        <span class="table__icon mdi mdi-delete"></span>
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td class="table__wrap">
                      This is the name of some item in this table
                    </td>
                    <td>Type 2</td>
                    <td>Approved</td>
                    <td>
                      <span
                        data-tooltip="In this tooltip the first words of the remarks will be visible…"
                        data-tooltip-pos="up"
                        data-tooltip-length="large"
                      >
                        <span class="table__icon mdi mdi-message-text"></span>
                      </span>
                    </td>
                    <td>10-11-2017</td>
                    <td>
                      <span data-tooltip="Edit" data-tooltip-pos="up">
                        <span class="table__icon mdi mdi-pencil"></span>
                      </span>
                    </td>
                    <td>
                      <span data-tooltip="Delete" data-tooltip-pos="up">
                        <span class="table__icon mdi mdi-delete"></span>
                      </span>
                    </td>
                  </tr>
                  <tr class="table__row--sub">
                    <td></td>
                    <td class="table__wrap">
                      <i class="table__icon mdi mdi-subdirectory-arrow-right"></i>
                      Subitem 1
                    </td>
                    <td>Type 2</td>
                    <td colspan="5"></td>
                  </tr>
                  <tr class="table__row--sub">
                    <td></td>
                    <td class="table__wrap">
                      <i class="table__icon mdi mdi-subdirectory-arrow-right"></i>
                      Subitem 2
                    </td>
                    <td>Type 3</td>
                    <td colspan="5"></td>
                  </tr>
                  <tr>
                    <td>1</td>
                    <td class="table__wrap">
                      This is another table item
                    </td>
                    <td>Type 4</td>
                    <td>Approved</td>
                    <td>
                      <span
                        data-tooltip="In this tooltip the first words of the remarks will be visible…"
                        data-tooltip-pos="up"
                        data-tooltip-length="large"
                      >
                        <span class="table__icon mdi mdi-message-text"></span>
                      </span>
                    </td>
                    <td>10-11-2017</td>
                    <td>
                      <span data-tooltip="Edit" data-tooltip-pos="up">
                        <span class="table__icon mdi mdi-pencil"></span>
                      </span>
                    </td>
                    <td>
                      <span data-tooltip="Delete" data-tooltip-pos="up">
                        <span class="table__icon mdi mdi-delete"></span>
                      </span>
                    </td>
                  </tr>
                  <tr class="table__row--sub">
                    <td></td>
                    <td class="table__wrap">
                      <i class="table__icon mdi mdi-subdirectory-arrow-right"></i>
                      Subitem 3
                    </td>
                    <td>Type 5</td>
                    <td colspan="5"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <styleguide-modal></styleguide-modal>
      <styleguide-modal-small></styleguide-modal-small>
    </div>
  </div>
</template>

<script>
import vSelect from "vue-select";
import StyleguideModal from "@/components/modals/Styleguide/StyleguideModal";
import StyleguideModalSmall from "@/components/modals/Styleguide/StyleguideModalSmall";

export default {
  name: "Styleguide",
  components: { vSelect, StyleguideModal, StyleguideModalSmall },
  data: function() {
    return {
      tooltip: 0,
      selected: null
    };
  },
  mounted: function() {
    setInterval(() => {
      this.tooltip += 1;
    }, 1000);
  },
  methods: {
    showStyleguideModal: function() {
      this.$modal.show("styleguide-modal");
    },
    showStyleguideModalSmall: function() {
      this.$modal.show("styleguide-modal-small");
    }
  }
};
</script>
