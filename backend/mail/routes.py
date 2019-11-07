from flask import jsonify, request, json
from flask_login import login_required
from backend.mail import bp
from backend.values import *
from backend import db
from backend.models import VirtualDomains, VirtualUsers, VirtualAliases


@bp.route('/virtual_domains', methods=[GET])
@login_required
def virtual_domains():
    data = VirtualDomains.query.order_by(VirtualDomains.name).all()
    return jsonify([d.json() for d in data])


@bp.route("/virtual_domain", methods=[POST, PATCH])
@login_required
def virtual_domain():
    data = json.loads(request.data)
    if request.method == POST:
        domain = VirtualDomains()
        domain.name = data["domain"]
        db.session.add(domain)
    if request.method == PATCH:
        domain = VirtualDomains.query.filter(VirtualDomains.id == data["id"]).first()
        domain.name = data["domain"]
        users = VirtualUsers.query.join(VirtualDomains).filter(VirtualDomains.id == domain.id).all()
        for user in users:
            user.update_email(domain)
        aliases = VirtualAliases.query.join(VirtualDomains).filter(VirtualDomains.id == domain.id).all()
        for alias in aliases:
            alias.update_source(domain)
    db.session.commit()
    return OK


@bp.route("/virtual_domain/<int:domain_id>", methods=[DELETE])
@login_required
def virtual_domain_delete(domain_id):
    domain = VirtualDomains.query.filter(VirtualDomains.id == domain_id).first()
    db.session.delete(domain)
    db.session.commit()
    return OK


@bp.route('/virtual_users', methods=[GET])
@login_required
def virtual_users():
    data = VirtualUsers.query.join(VirtualDomains).order_by(VirtualDomains.name, VirtualUsers.email).all()
    return jsonify([d.json() for d in data])


@bp.route("/virtual_user", methods=[POST, PATCH])
@login_required
def virtual_user():
    data = json.loads(request.data)
    domain = VirtualDomains.query.filter(VirtualDomains.id == data["domain"]).first()
    if request.method == POST:
        user = VirtualUsers()
        user.set_password(data["password"])
        db.session.add(user)
    else:
        user = VirtualUsers.query.filter(VirtualUsers.id == data["id"]).first()
        if data["password"] != "":
            user.set_password(data["password"])
    user.domain = domain
    user.set_email(data["email"], domain)
    db.session.commit()
    return OK


@bp.route("/virtual_user/<int:user_id>", methods=[DELETE])
@login_required
def virtual_user_delete(user_id):
    user = VirtualUsers.query.filter(VirtualUsers.id == user_id).first()
    db.session.delete(user)
    db.session.commit()
    return OK


@bp.route("/virtual_user/<int:user_id>/check_password", methods=[POST])
@login_required
def virtual_user_check_password(user_id):
    user = VirtualUsers.query.filter(VirtualUsers.id == user_id).first()
    data = json.loads(request.data)
    if user.check_password(data["password"]):
        return OK
    else:
        return BAD_REQUEST


@bp.route('/virtual_aliases', methods=[GET])
@login_required
def virtual_aliases():
    data = VirtualAliases.query.join(VirtualDomains)\
        .order_by(VirtualDomains.name, VirtualAliases.source, VirtualAliases.destination).all()
    return jsonify([d.json() for d in data])


@bp.route("/virtual_alias", methods=[POST, PATCH])
@login_required
def virtual_alias():
    data = json.loads(request.data)
    domain = VirtualDomains.query.filter(VirtualDomains.id == data["domain"]).first()
    if request.method == POST:
        data = json.loads(request.data)
        alias = VirtualAliases()
        db.session.add(alias)
    else:
        alias = VirtualAliases.query.filter(VirtualAliases.id == data["id"]).first()
    alias.domain = domain
    alias.set_source(data["source"], domain)
    alias.destination = data["destination"]
    db.session.commit()
    return OK


@bp.route("/virtual_alias/<int:alias_id>", methods=[DELETE])
@login_required
def virtual_alias_delete(alias_id):
    alias = VirtualAliases.query.filter(VirtualAliases.id == alias_id).first()
    db.session.delete(alias)
    db.session.commit()
    return OK
