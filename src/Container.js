// LICENSE : MIT
"use strict";
import FluxStoreGroup from "./FluxStoreGroup";
export default class Container {
    static create(Base) {
        return class ContainerComponent extends Base {
            constructor(props) {
                super(props);
                this.state = Base.calculateState(null, props);
                // initialize
                this._fluxContainerSubscriptions = [];
            }

            componentDidMount():void {
                if (super.componentDidMount) {
                    super.componentDidMount();
                }

                var stores = Base.getStores();

                // This tracks when any store has changed and we may need to update.
                var changed = false;
                var setChanged = () => {
                    changed = true;
                };

                // This adds subscriptions to stores. When a store changes all we do is
                // set changed to true.
                this._fluxContainerSubscriptions = stores.map(
                    store => store.onChange(setChanged)
                );

                // This callback is called after the dispatch of the relevant stores. If
                // any have reported a change we update the state, then reset changed.
                var callback = () => {
                    if (changed) {
                        this.setState(prevState => {
                            return Base.calculateState(prevState, this.props);
                        });
                    }
                    changed = false;
                };
                this._fluxContainerStoreGroup = new FluxStoreGroup(stores, callback);
            }

            componentWillReceiveProps(nextProps, nextContext) {
                if (super.componentWillReceiveProps) {
                    super.componentWillReceiveProps(nextProps, nextContext);
                }

                // Finally update the state using the new props.
                this.setState(prevState => Base.calculateState(prevState, nextProps));
            }

            componentWillUnmount():void {
                if (super.componentWillUnmount) {
                    super.componentWillUnmount();
                }

                this._fluxContainerStoreGroup.release();
                for (var subscription of this._fluxContainerSubscriptions) {
                    subscription.remove();
                }
                this._fluxContainerSubscriptions = [];
            }
        }
    }
}
