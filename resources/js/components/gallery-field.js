import React from 'react';
import FilePickerWidget from "../core/ui/file-picker-widget";
import Field from "../core/ui/field";
import Button from "../core/ui/button";
import IconButton from "../core/ui/icon-button";
import FilePreview from "../core/ui/file-preview";
import Placeholder from "../core/ui/placeholder";
import util from "../core/ui/util";
import array from "../util/array";

class GalleryField extends React.Component {

    static defaultProps = {
        path: {},
        data: {},
        label: '',
        name: '',
        style: '',
        singular: '',
        plural: '',
        orderColumn: ''
    };

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            selectedFiles: this.props.data[this.props.name] || [],
            selectedFilesIds: (this.props.data[this.props.name] ? this.props.data[this.props.name].map(file => file.id) : [])
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.data[this.props.name] !== prevProps.data[this.props.name]) {
            this.setState({
                selectedFiles: this.props.data[this.props.name] || [],
                selectedFilesIds: (this.props.data[this.props.name] ? this.props.data[this.props.name].map(file => file.id) : [])
            });
        }
    }

    getData(data) {
        data[this.props.name] = this.state.selectedFiles || [];
        return data;
    }

    handleSubmit(data) {
        data[this.props.name] = this.state.selectedFilesIds || [];
    }

    open() {
        this.setState({
            isOpen: true
        });
    }

    close() {
        this.setState({
            isOpen: false
        });
    }

    onSelectionConfirm(ids, files) {
        this.setState({
            isOpen: false,
            selectedFiles: files,
            selectedFilesIds: ids
        });
    }

    remove(index) {

        this.state.selectedFiles.splice(index, 1);
        this.state.selectedFilesIds.splice(index, 1);

        this.setState({
            selectedFiles: this.state.selectedFiles,
            selectedFilesIds: this.state.selectedFilesIds
        });
    }

    sortForward(i) {
        if (i !== (this.state.selectedFiles.length - 1)) {
            this.setState({
                selectedFiles: array.move(this.state.selectedFiles, i, i+1),
                selectedFilesIds: array.move(this.state.selectedFilesIds, i, i+1)
            });
        }
    }

    sortBackward(i) {
        if (i !== 0) {
            this.setState({
                selectedFiles: array.move(this.state.selectedFiles, i, i-1),
                selectedFilesIds: array.move(this.state.selectedFilesIds, i, i-1)
            });
        }
    }

    renderItemOverlay(i) {

        let orderActions;
        let orderLeft;
        let orderRight;

        if (this.props.orderColumn) {
            if (i !== 0) {
                orderLeft = <IconButton name={'arrow_back'} onClick={e => this.sortBackward(i)} />;
            }
            if (i !== (this.state.selectedFiles.length - 1)) {
                orderRight = <IconButton name={'arrow_forward'} onClick={e => this.sortForward(i)} />;
            }

            orderActions = (
                <div className="gallery-field__item-order">
                    {orderLeft}
                    {orderRight}
                </div>
            );
        }

        return (
            <div className="gallery-field__item-overlay">
                <div className="gallery-field__item-delete">
                    <IconButton name={'delete'} onClick={e => this.remove(i)} />
                </div>
                {orderActions}
            </div>
        );
    }

    renderContent() {

        if (this.state.selectedFiles.length) {
            return (
                <div className="gallery-field__grid">
                    {this.state.selectedFiles.map((file, i) => {
                        return (
                            <div className="gallery-field__item" key={i}>
                                <FilePreview file={file} style={['full']} mediaConversion={'contain'} />
                                {this.renderItemOverlay(i)}
                            </div>
                        );
                    })}
                </div>
            );
        }

        return <Placeholder icon={'image_search'} onClick={this.open.bind(this)}>Select {this.props.plural}</Placeholder>;
    }

    render() {

        let widget;

        if (this.state.isOpen) {
            widget = (
                <div className="overlay">
                    <FilePickerWidget
                        selectionMode={true}
                        defaultSelectedFiles={this.state.selectedFiles}
                        defaultSelectedFileIds={this.state.selectedFilesIds}
                        onCancel={this.close.bind(this)}
                        onSelectionConfirm={this.onSelectionConfirm.bind(this)}
                    />
                </div>
            );
        }

        return (
            <div className="gallery-field">
                <Field name={this.props.name} label={this.props.label} errors={this.props.errors}>
                    <div className="gallery-field__btn">
                        <Button style={['small', 'secondary']} icon={'add'} text={'Select '+this.props.plural} onClick={this.open.bind(this)} />
                    </div>
                    <div className="gallery-field__content">
                        {this.renderContent()}
                    </div>
                </Field>
                {widget}
            </div>
        );
    }
}

export default GalleryField;
