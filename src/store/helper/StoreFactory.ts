import {
  StoreOptions,
  GetterTree,
  MutationTree,
  ModuleTree,
  Module,
  ActionTree
} from 'vuex';

export class BaseStore<S> implements StoreOptions<S> {
  public state?: S;
  public getters?: GetterTree<S, S>;
  public mutations?: MutationTree<S>;
  public actions?: ActionTree<S, S>;
  public modules?: ModuleTree<S>;
  // plugins?: Plugin<S>[];
  // strict?: boolean;
  constructor(
    state: S,
    getter: GetterTree<S, S>,
    mutations: MutationTree<S>,
    actions?: ActionTree<S, S>,
    modules?: ModuleTree<S>
  ) {
    this.state = state;
    this.getters = getter;
    this.mutations = mutations;
    this.actions = actions;
  }
}

export const BaseStoreInst = new BaseStore<any>({}, {}, {}, {});

// tslint:disable-next-line: max-classes-per-file
export class StoreDataModuleBase<S, R> implements Module<S, R> {
  public state?: S;
  public getters?: GetterTree<S, R>;
  public actions?: ActionTree<S, R>;
  public mutations?: MutationTree<S>;
  public modules?: ModuleTree<R>;
  // plugins?: Plugin<S>[];
  // strict?: boolean;

  constructor(
    state: S,
    getter: GetterTree<S, R>,
    mutations: MutationTree<S>,
    actions?: ActionTree<S, R>,
    modules?: ModuleTree<R>
  ) {
    this.state = state;
    this.getters = getter;
    this.mutations = mutations;
    this.actions = actions;
  }
}
